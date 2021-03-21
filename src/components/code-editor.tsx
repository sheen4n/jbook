import MonacoEditor from '@monaco-editor/react';

const CodeEditor = () => {
  return (
    <MonacoEditor
      height='500px'
      language='javascript'
      theme='dark'
      options={{
        wordWrap: 'on',
        minimap: {
          enabled: false,
        },
      }}
    />
  );
};

export default CodeEditor;
