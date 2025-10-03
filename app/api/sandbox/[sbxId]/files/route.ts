import { Sandbox } from '@e2b/code-interpreter'
import { FileSystemNode } from '@/components/file-tree'

export const maxDuration = 60
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * GET /api/sandbox/[sbxId]/files
 * Fetches the file tree from an E2B sandbox
 */
export async function GET(
  req: Request,
  { params }: { params: { sbxId: string } }
) {
  try {
    const { sbxId } = params

    if (!sbxId) {
      return new Response(
        JSON.stringify({ error: 'Missing sandbox ID' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (!process.env.E2B_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'E2B_API_KEY not configured' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Connect to existing sandbox
    const sbx = await Sandbox.connect(sbxId)

    // Get file tree from sandbox using shell command
    const result = await sbx.commands.run(
      'find /home/user -type f -o -type d | sort'
    )

    if (result.exitCode !== 0) {
      console.error('Error listing files:', result.stderr)
      return new Response(
        JSON.stringify({ error: 'Failed to list files', details: result.stderr }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Parse the file paths into a tree structure
    const files = parseFileTree(result.stdout)

    return new Response(
      JSON.stringify({ files }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error: any) {
    console.error('Error fetching sandbox files:', error)
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch sandbox files',
        details: error?.message || 'Unknown error'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

/**
 * Parse file paths from find command output into a tree structure
 */
function parseFileTree(output: string): FileSystemNode[] {
  const lines = output.trim().split('\n').filter(line => line.trim())
  const root: FileSystemNode[] = []
  const nodeMap = new Map<string, FileSystemNode>()

  // Sort paths to ensure parents come before children
  const paths = lines
    .map(line => line.trim())
    .filter(path => path.startsWith('/home/user/'))
    .sort()

  for (const fullPath of paths) {
    // Remove /home/user/ prefix
    const relativePath = fullPath.replace('/home/user/', '')
    if (!relativePath) continue

    const parts = relativePath.split('/')
    const name = parts[parts.length - 1]
    const parentPath = parts.slice(0, -1).join('/')

    // Determine if it's a directory (find includes both files and dirs)
    // We'll check if there are children later
    const node: FileSystemNode = {
      name,
      isDirectory: false, // Will be updated if we find children
      path: `/${relativePath}`,
      children: []
    }

    nodeMap.set(relativePath, node)

    if (parentPath === '') {
      // Root level file/directory
      root.push(node)
    } else {
      // Add to parent's children
      const parent = nodeMap.get(parentPath)
      if (parent) {
        if (!parent.children) {
          parent.children = []
        }
        parent.children.push(node)
        // Mark parent as directory
        parent.isDirectory = true
      }
    }
  }

  return root
}
