import { NextRequest, NextResponse } from 'next/server'
import { Sandbox, FileType } from '@e2b/code-interpreter'
import { FileSystemNode } from '@/components/file-tree'
import { getSandbox } from '@/lib/sandbox'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function listFilesRecursively(
  sandbox: Sandbox,
  path: string,
): Promise<FileSystemNode[]> {
  const files = await sandbox.files.list(path)
  const nodes: FileSystemNode[] = []

  for (const file of files) {
    const fullPath = `${path}/${file.name}`
    if (file.type === FileType.DIR) {
      nodes.push({
        name: file.name,
        isDirectory: true,
        children: await listFilesRecursively(sandbox, fullPath),
      })
    } else {
      nodes.push({
        name: file.name,
        isDirectory: false,
        path: fullPath,
      })
    }
  }
  return nodes
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const sessionID = searchParams.get('sessionID')
  const template = searchParams.get('template')

  if (!sessionID) {
    return NextResponse.json(
      { error: 'sessionID is required' },
      { status: 400 },
    )
  }

  try {
    const sandbox = await getSandbox(sessionID, template || undefined)
    const fileTree = await listFilesRecursively(sandbox, '/')
    return NextResponse.json(fileTree)
  } catch (error) {
    console.error('Error fetching file tree:', error)
    return NextResponse.json(
      { error: 'Failed to fetch file tree' },
      { status: 500 },
    )
  }
}
