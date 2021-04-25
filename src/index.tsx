import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';
import { store } from './state';
// import CodeCell from './components/code-cell';
import TextEditor from './components/text-editor';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        {/* <CodeCell /> */}
        <TextEditor />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
