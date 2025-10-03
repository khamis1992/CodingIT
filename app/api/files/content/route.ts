import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const sessionID = request.nextUrl.searchParams.get('sessionID')
    const path = request.nextUrl.searchParams.get('path')

    if (!sessionID || !path) {
      return NextResponse.json({ error: 'Session ID and path are required' }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Supabase configuration missing' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Fetch the file content
    const { data: file, error } = await supabase
      .from('workspace_files')
      .select('content, path, name, is_directory')
      .eq('user_id', sessionID)
      .eq('path', path)
      .single()

    if (error) {
      console.error('Error fetching file content:', error)
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    if (file.is_directory) {
      return NextResponse.json({ error: 'Cannot read content of a directory' }, { status: 400 })
    }

    return NextResponse.json({
      content: file.content,
      path: file.path,
      name: file.name
    })
  } catch (error) {
    console.error('Error in GET /api/files/content:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionID, path, content } = body

    if (!sessionID || !path || content === undefined) {
      return NextResponse.json({ error: 'Session ID, path, and content are required' }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Supabase configuration missing' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Calculate content size
    const sizeBytes = Buffer.byteLength(content, 'utf8')

    // Update the file content
    const { data: file, error } = await supabase
      .from('workspace_files')
      .update({
        content,
        size_bytes: sizeBytes,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', sessionID)
      .eq('path', path)
      .select()
      .single()

    if (error) {
      console.error('Error updating file content:', error)
      return NextResponse.json({ error: 'Failed to update file' }, { status: 500 })
    }

    return NextResponse.json({ success: true, file })
  } catch (error) {
    console.error('Error in POST /api/files/content:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
