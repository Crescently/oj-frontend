import Editor, { OnMount } from '@monaco-editor/react';
import React, { useEffect, useRef, useState } from 'react';
import { editor } from 'monaco-editor';
import IStandaloneEditorConstructionOptions = editor.IStandaloneEditorConstructionOptions;

const editorOptions: IStandaloneEditorConstructionOptions = {
  automaticLayout: true,
  lineNumbersMinChars: 1,
  renderLineHighlight: 'all',
  colorDecorators: true,
  fontSize: 20,
  wordWrap: 'on',
  suggestOnTriggerCharacters: true,
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

const codeTemplates: Record<string, string> = {
  java: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello World");
  }
}`,
  python: `def main():
    print("Hello, Python!")

if __name__ == "__main__":
    main()`,
  cpp: `#include <iostream>
using namespace std;

int main() {
  cout << "Hello World" << endl;
  return 0;
}`,
  go: `package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}`,
};

const CodeEditor: React.FC<CodeEditorProps> = ({ value, language = 'java', onChange }) => {
  const [editorInstance, setEditorInstance] = useState<editor.IStandaloneCodeEditor>();
  const currentTemplate = useRef<{ language: string; content: string } | null>(null);
  const handleEditorDidMount: OnMount = (editor) => {
    setEditorInstance(editor);
    const model = editor.getModel();

    // 初始化时应用模板（仅当没有传入value时）
    if (model && value === undefined) {
      const template = codeTemplates[language] || '';
      model.setValue(template);
      currentTemplate.current = { language, content: template };
    }
  };

  useEffect(() => {
    if (editorInstance) {
      const model = editorInstance.getModel();
      const newTemplate = codeTemplates[language] || '';
      if (model) {
        model.setValue(newTemplate);
        currentTemplate.current = { language, content: newTemplate };
      }
    }
  }, [language, editorInstance, value]); //

  // 语言同步
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
