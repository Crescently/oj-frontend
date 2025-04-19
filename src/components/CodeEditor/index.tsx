import Editor, { OnMount } from '@monaco-editor/react';
import React, { useState } from 'react';
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
  value: string;
  handleEditorChange: (value: string | undefined) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, handleEditorChange }) => {
  const [currentLang, setCurrentLang] = useState('java');

  const handleEditorDidMount: OnMount = (editor) => {
    const model = editor.getModel();
    if (model) {
      const language = model.getLanguageId();
      setCurrentLang(language); // 设置当前语言
    }
  };

  return (
    <>
      <div>
        当前语言：<strong>{currentLang}</strong>
      </div>
      <Editor
        height="500px"
        language={currentLang}
        saveViewState={true}
        value={value}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={editorOptions}
      />
    </>
  );
};

export default CodeEditor;
