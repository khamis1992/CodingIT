import { TemplateId } from './templates'

export interface TemplateFile {
  name: string
  content: string
}

export async function getTemplateFiles(templateId: TemplateId, fragmentCode?: string): Promise<TemplateFile[]> {
  let templateFiles: TemplateFile[] = []

  try {
    const response = await fetch(`/api/templates?templateId=${templateId}`)
    if (!response.ok) {
      throw new Error('Failed to fetch template files')
    }
    templateFiles = await response.json()

    if (fragmentCode) {
      const mainFileName = getMainFileName(templateId)
      const existingIndex = templateFiles.findIndex(f => f.name === mainFileName)
      if (existingIndex >= 0) {
        templateFiles[existingIndex].content = fragmentCode
      } else {
        templateFiles.unshift({
          name: mainFileName,
          content: fragmentCode
        })
      }
    }
  } catch (error) {
    console.warn(`Failed to load template files for ${templateId}:`, error)
    if (fragmentCode) {
      templateFiles.push({
        name: getMainFileName(templateId),
        content: fragmentCode
      })
    }
  }

  return templateFiles
}

function getMainFileName(templateId: TemplateId): string {
  const mainFiles: Record<TemplateId, string> = {
    'code-interpreter-v1': 'script.py',
    'nextjs-developer': 'pages/index.tsx',
    'vue-developer': 'app.vue',
    'streamlit-developer': 'app.py',
    'gradio-developer': 'app.py'
  }

  return mainFiles[templateId] || 'main.txt'
}
