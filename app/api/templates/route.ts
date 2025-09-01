import { NextRequest, NextResponse } from 'next/server'
import { TemplateId } from '@/lib/templates'
import { readFileSync } from 'fs'
import { join } from 'path'

export interface TemplateFile {
  name: string
  content: string
}

function getTemplateFiles(templateId: TemplateId): TemplateFile[] {
  const templateFiles: TemplateFile[] = []

  try {
    const templateDir = join(process.cwd(), 'sandbox-templates', templateId)
    const fileMappings: Record<TemplateId, string[]> = {
      'code-interpreter-v1': ['script.py'],
      'nextjs-developer': ['_app.tsx', 'e2b.Dockerfile', 'e2b.toml', 'compile_page.sh'],
      'vue-developer': ['app.vue', 'e2b.Dockerfile', 'e2b.toml', 'nuxt.config.ts'],
      'streamlit-developer': ['app.py', 'e2b.Dockerfile', 'e2b.toml'],
      'gradio-developer': ['app.py', 'e2b.Dockerfile', 'e2b.toml']
    }

    const files = fileMappings[templateId] || []

    for (const file of files) {
      try {
        const filePath = join(templateDir, file)
        const content = readFileSync(filePath, 'utf-8')
        templateFiles.push({
          name: file,
          content
        })
      } catch (error) {
        console.warn(`Failed to read template file ${file}:`, error)
      }
    }
  } catch (error) {
    console.warn(`Failed to load template files for ${templateId}:`, error)
  }

  return templateFiles
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const templateId = searchParams.get('templateId') as TemplateId

  if (!templateId) {
    return NextResponse.json({ error: 'templateId is required' }, { status: 400 })
  }

  const templateFiles = getTemplateFiles(templateId)
  return NextResponse.json(templateFiles)
}
