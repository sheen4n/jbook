import { Fragment, useEffect } from 'react';
import { useAppDispatch } from '../hooks/use-app-dispatch';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { fetchCells } from '../store/cells';
import AddCell from './add-cell';
import CellListItem from './cell-list-item';
import './cell-list.css';

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) => order.map((id) => data[id]));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCells());
  }, [dispatch]);

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell}></CellListItem>
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className='cell-list'>
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
