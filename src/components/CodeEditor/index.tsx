import Editor, { OnMount } from '@monaco-editor/react';
import React, { useEffect, useState } from 'react';
import { editor } from 'monaco-editor';
import IStandaloneEditorConstructionOptions = editor.IStandaloneEditorConstructionOptions;

const editorOptions: IStandaloneEditorConstructionOptions = {
  lineNumbersMinChars: 1,
  renderLineHighlight: 'all',
  colorDecorators: true,
  fontSize: 20,
  wordWrap: 'on',
  minimap: { enabled: false },
  formatOnType: true,
  autoClosingBrackets: 'always',
  scrollbar: {
    vertical: 'visible',
    horizontal: 'visible',
    verticalScrollbarSize: 8,
    horizontalScrollbarSize: 8,
    arrowSize: 12,
    useShadows: false,
    handleMouseWheel: true,
    alwaysConsumeMouseWheel: false,
  },
};

interface CodeEditorProps {
  value?: string;
  language?: string;
  onChange?: (value: string | undefined) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, language = 'java', onChange }) => {
  // 移除内部状态管理，直接使用父组件传递的 language
  const [editorInstance, setEditorInstance] = useState<editor.IStandaloneCodeEditor>();

  const handleEditorDidMount: OnMount = (editor) => {
    setEditorInstance(editor);
  };

  // 添加语言同步逻辑
  useEffect(() => {
    if (editorInstance && language) {
      const model = editorInstance.getModel();
      if (model && model.getLanguageId() !== language) {
        editor.setModelLanguage(model, language);
      }
    }
  }, [language, editorInstance]);

  return (
    <>
      <Editor
        height="750px"
        language={language}
        saveViewState={true}
        value={value}
        onChange={onChange}
        onMount={handleEditorDidMount}
        options={editorOptions}
      />
    </>
  );
};

export default CodeEditor;
