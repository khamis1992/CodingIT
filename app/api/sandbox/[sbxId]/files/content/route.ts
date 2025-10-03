import { Sandbox } from '@e2b/code-interpreter'
import { NextRequest } from 'next/server'

export const maxDuration = 60
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * GET /api/sandbox/[sbxId]/files/content?path=/path/to/file
 * Fetches the content of a specific file from an E2B sandbox
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { sbxId: string } }
) {
  try {
    const { sbxId } = params
    const searchParams = req.nextUrl.searchParams
    const filePath = searchParams.get('path')

    if (!sbxId) {
      return new Response(
        JSON.stringify({ error: 'Missing sandbox ID' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (!filePath) {
      return new Response(
        JSON.stringify({ error: 'Missing file path' }),
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

    // Read file content from sandbox
    // Remove leading slash if present and prepend /home/user/
    const fullPath = filePath.startsWith('/')
      ? `/home/user${filePath}`
      : `/home/user/${filePath}`

    const result = await sbx.commands.run(`cat "${fullPath}"`)

    if (result.exitCode !== 0) {
      console.error('Error reading file:', result.stderr)
      return new Response(
        JSON.stringify({
          error: 'Failed to read file',
          details: result.stderr,
          path: fullPath
        }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({
        content: result.stdout,
        path: filePath
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error: any) {
    console.error('Error fetching file content:', error)
    return new Response(
      JSON.stringify({
        error: 'Failed to fetch file content',
        details: error?.message || 'Unknown error'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

/**
 * POST /api/sandbox/[sbxId]/files/content
 * Writes content to a specific file in an E2B sandbox
 */
export async function POST(
  req: Request,
  { params }: { params: { sbxId: string } }
) {
  try {
    const { sbxId } = params
    const { path: filePath, content } = await req.json()

    if (!sbxId) {
      return new Response(
        JSON.stringify({ error: 'Missing sandbox ID' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (!filePath || content === undefined) {
      return new Response(
        JSON.stringify({ error: 'Missing file path or content' }),
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

    // Write file content to sandbox
    const fullPath = filePath.startsWith('/')
      ? filePath.substring(1)
      : filePath

    await sbx.files.write(fullPath, content)

    return new Response(
      JSON.stringify({
        success: true,
        path: filePath
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error: any) {
    console.error('Error writing file content:', error)
    return new Response(
      JSON.stringify({
        error: 'Failed to write file content',
        details: error?.message || 'Unknown error'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
