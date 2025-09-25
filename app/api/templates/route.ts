import { NextRequest, NextResponse } from 'next/server'
import { TemplateId } from '@/lib/templates'
import { readFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

export interface TemplateFile {
  name: string
  content: string
}

function getTemplateFiles(templateId: TemplateId): TemplateFile[] {
  const templateFiles: TemplateFile[] = []

  try {
    const templateDir = join(process.cwd(), 'sandbox-templates', templateId)

    // Read all files in the template directory
    const files = readdirSync(templateDir)

    for (const file of files) {
      try {
        const filePath = join(templateDir, file)
        const stat = statSync(filePath)

        // Only include files, not directories
        if (stat.isFile()) {
          const content = readFileSync(filePath, 'utf-8')
          templateFiles.push({
            name: file,
            content
          })
        }
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
