import { useEffect } from 'react';

import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell, cellUpdated } from '../state/cells';
import { useTypedSelector } from '../hooks/use-typed-selector';
import './code-cell.css';
import { useCumulativeCode } from '../hooks/use-cumulative-code';
import { useAppDispatch } from '../hooks/use-app-dispatch';
import { createBundle } from '../state/bundles';
interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const dispatch = useAppDispatch();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  const cumulativeCode = useCumulativeCode(cell.id);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode)(dispatch);
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode)(dispatch);
    }, 750);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createBundle, cell.id, cumulativeCode]);

  return (
    <Resizable direction='vertical'>
      <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction='horizontal'>
          <CodeEditor
            onChange={(value) => dispatch(cellUpdated({ id: cell.id, content: value }))}
            initialValue={cell.content}
          />
        </Resizable>
        <div className='progress-wrapper'>
          {!bundle || bundle.loading ? (
            <div className='progress-cover'>
              <progress className='progress is-small is-primary' max='100'>
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
