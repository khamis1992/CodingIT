import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

// Helper function to build file tree from flat list
function buildFileTree(files: any[]): any[] {
  const tree: any[] = []
  const pathMap = new Map<string, any>()

  // Sort files by path to ensure parents are processed before children
  const sortedFiles = files.sort((a, b) => a.path.localeCompare(b.path))

  for (const file of sortedFiles) {
    const node = {
      name: file.name,
      path: file.path,
      isDirectory: file.is_directory,
      children: file.is_directory ? [] : undefined,
    }

    pathMap.set(file.path, node)

    if (file.parent_path) {
      const parent = pathMap.get(file.parent_path)
      if (parent && parent.children) {
        parent.children.push(node)
      } else {
        tree.push(node)
      }
    } else {
      tree.push(node)
    }
  }

  return tree
}

export async function GET(request: NextRequest) {
  try {
    const sessionID = request.nextUrl.searchParams.get('sessionID')

    if (!sessionID) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Supabase configuration missing' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Fetch all workspace files for the user
    const { data: files, error } = await supabase
      .from('workspace_files')
      .select('*')
      .eq('user_id', sessionID)
      .order('path', { ascending: true })

    if (error) {
      console.error('Error fetching workspace files:', error)
      return NextResponse.json({ error: 'Failed to fetch files' }, { status: 500 })
    }

    // Build file tree structure
    const fileTree = buildFileTree(files || [])

    return NextResponse.json(fileTree)
  } catch (error) {
    console.error('Error in GET /api/files:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionID, path, isDirectory, content = '' } = body

    if (!sessionID || !path) {
      return NextResponse.json({ error: 'Session ID and path are required' }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Supabase configuration missing' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Extract file name and parent path
    const pathParts = path.split('/')
    const name = pathParts[pathParts.length - 1]
    const parentPath = pathParts.length > 1 ? pathParts.slice(0, -1).join('/') : null

    // Calculate content size
    const sizeBytes = Buffer.byteLength(content, 'utf8')

    // Insert the new file
    const { data: file, error } = await supabase
      .from('workspace_files')
      .insert({
        user_id: sessionID,
        path,
        name,
        content,
        is_directory: isDirectory,
        parent_path: parentPath,
        size_bytes: sizeBytes,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating workspace file:', error)
      return NextResponse.json({ error: 'Failed to create file' }, { status: 500 })
    }

    return NextResponse.json({ success: true, file })
  } catch (error) {
    console.error('Error in POST /api/files:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionID, path } = body

    if (!sessionID || !path) {
      return NextResponse.json({ error: 'Session ID and path are required' }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Supabase configuration missing' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Delete the file and all its children (for directories)
    const { error } = await supabase
      .from('workspace_files')
      .delete()
      .eq('user_id', sessionID)
      .or(`path.eq.${path},parent_path.eq.${path}`)

    if (error) {
      console.error('Error deleting workspace file:', error)
      return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/files:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
