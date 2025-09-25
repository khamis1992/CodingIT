import { templatesToPrompt, Templates } from '@/lib/templates'
import { getLLMGuide, getTemplateInstructions } from '@/lib/llm-guide'

export function toPrompt(template: Templates) {
  const llmGuide = getLLMGuide()

  const templateInstructions = getTemplateInstructions(template.toString())

  const availableTemplates = `

AVAILABLE TEMPLATES IN THIS SESSION

Current template: ${template}
Template configuration:
${templatesToPrompt(template)}

${templateInstructions ? `
TEMPLATE-SPECIFIC INSTRUCTIONS FOR ${template.toString().toUpperCase()}

${templateInstructions}
` : ''}

FRAGMENT SCHEMA COMPLIANCE

- Adhere to fragmentSchema defined in @/lib/schema
- Include: commentary, template, title, description, additional_dependencies, has_additional_dependencies, install_dependencies_command, port, file_path, code
- Ensure isolated sandbox execution within 10-minute timeout
- Implement state persistence via fragment schema and E2B sandbox API
- Generate complete file contents (E2B WebContainer cannot perform diff/patch edits)
`

  return [
    llmGuide,
    availableTemplates,
  ].join('\n')
}