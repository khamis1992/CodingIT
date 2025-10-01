import { FragmentCode } from './fragment-code'
import { FragmentPreview } from './fragment-preview'
import { FragmentTerminal } from './fragment-terminal'
import { FragmentInterpreter } from './fragment-interpreter'
import { CodeEditor } from './code-editor'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { FragmentSchema } from '@/lib/schema'
import { ExecutionResult } from '@/lib/types'
import { DeepPartial } from 'ai'
import { ChevronsRight, LoaderCircle, Terminal, Code, FileCode } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

export function Preview({
  teamID,
  accessToken,
  selectedTab,
  onSelectedTabChange,
  isChatLoading,
  isPreviewLoading,
  fragment,
  result,
  onClose,
  code,
  selectedFile,
  onSave,
  executeCode,
}: {
  teamID: string | undefined
  accessToken: string | undefined
  selectedTab: 'code' | 'fragment' | 'terminal' | 'interpreter' | 'editor'
  onSelectedTabChange: Dispatch<SetStateAction<'code' | 'fragment' | 'terminal' | 'interpreter' | 'editor'>>
  isChatLoading: boolean
  isPreviewLoading: boolean
  fragment?: DeepPartial<FragmentSchema>
  result?: ExecutionResult
  onClose: () => void
  code?: string
  selectedFile?: { path: string; content: string } | null
  onSave?: (path: string, content: string) => Promise<void>
  executeCode?: (code: string) => Promise<any>
}) {
  if (!fragment) {
    return null
  }

  return (
    <div className="absolute md:relative z-10 top-0 left-0 shadow-2xl md:rounded-tl-3xl md:rounded-bl-3xl md:border-l md:border-y bg-popover h-full w-full overflow-auto">
      <Tabs
        value={selectedTab}
        onValueChange={(value) =>
          onSelectedTabChange(value as 'code' | 'fragment' | 'terminal' | 'interpreter' | 'editor')
        }
        className="h-full flex flex-col items-start justify-start"
      >
        <div className="w-full p-2 grid grid-cols-3 items-center border-b">
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground"
                  onClick={onClose}
                >
                  <ChevronsRight className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Close sidebar</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex justify-center">
            <TabsList className="px-1 py-0 border h-8">
              <TabsTrigger
                className="font-normal text-xs py-1 px-2 gap-1 flex items-center"
                value="code"
              >
                {isChatLoading && (
                  <LoaderCircle
                    strokeWidth={3}
                    className="h-3 w-3 animate-spin"
                  />
                )}
                <Code className="h-3 w-3" />
                Code
              </TabsTrigger>
              <TabsTrigger
                disabled={!result}
                className="font-normal text-xs py-1 px-2 gap-1 flex items-center"
                value="fragment"
              >
                Preview
                {isPreviewLoading && (
                  <LoaderCircle
                    strokeWidth={3}
                    className="h-3 w-3 animate-spin"
                  />
                )}
              </TabsTrigger>
              <TabsTrigger
                disabled={!result}
                className="font-normal text-xs py-1 px-2 gap-1 flex items-center"
                value="terminal"
              >
                <Terminal className="h-3 w-3" />
                Terminal
              </TabsTrigger>
              <TabsTrigger
                disabled={!result || result.template !== 'code-interpreter-v1'}
                className="font-normal text-xs py-1 px-2 gap-1 flex items-center"
                value="interpreter"
              >
                <Code className="h-3 w-3" />
                Interpreter
              </TabsTrigger>
              <TabsTrigger
                disabled={!selectedFile}
                className="font-normal text-xs py-1 px-2 gap-1 flex items-center"
                value="editor"
              >
                <FileCode className="h-3 w-3" />
                Editor
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="flex items-center justify-end gap-2">
            {/* Add any additional buttons here */}
          </div>
        </div>
        {fragment && (
          <div className="overflow-y-auto w-full h-full">
            <TabsContent value="code" className="h-full">
              {fragment.code ? (
                <FragmentCode
                  files={[
                    {
                      name: fragment.file_path || 'code.txt',
                      content: fragment.code || '',
                    },
                  ]}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No code to display
                </div>
              )}
            </TabsContent>
            <TabsContent value="fragment" className="h-full">
              {result ? (
                <FragmentPreview
                  result={result as ExecutionResult}
                  code={code || fragment.code || ''}
                  executeCode={executeCode || (async () => {})}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Preview will appear here once the code is executed
                </div>
              )}
            </TabsContent>
            <TabsContent value="terminal" className="h-full">
              {result ? (
                <FragmentTerminal
                  teamID={teamID}
                  accessToken={accessToken}
                  result={result as ExecutionResult}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Terminal access will appear here once the sandbox is created
                </div>
              )}
            </TabsContent>
            <TabsContent value="interpreter" className="h-full">
              {result && result.template === 'code-interpreter-v1' ? (
                <FragmentInterpreter
                  result={result}
                  code={code || fragment.code || ''}
                  executeCode={executeCode || (async () => {})}
                />
              ) : result ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Interpreter only available for code-interpreter-v1 template
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Interpreter will appear here once the sandbox is created
                </div>
              )}
            </TabsContent>
            <TabsContent value="editor" className="h-full">
              {selectedFile && onSave ? (
                <CodeEditor
                  code={selectedFile.content}
                  lang={selectedFile.path.split('.').pop() || 'txt'}
                  onChange={(value) => {
                    if (value !== undefined) {
                      onSave(selectedFile.path, value)
                    }
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Select a file from the file tree to edit
                </div>
              )}
            </TabsContent>
          </div>
        )}
      </Tabs>
    </div>
  )
}
