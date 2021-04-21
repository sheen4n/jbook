import { useState } from 'react';

import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';

const CodeCell = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <>
      <CodeEditor onChange={(value) => setInput(value)} initialValue='const a = 1;' />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </>
  );
};

export default CodeCell;
