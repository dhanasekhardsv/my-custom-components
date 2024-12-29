// import { Provider } from 'react-redux';
import './App.css';
// import store from './store';
import { RouterProvider } from 'react-router-dom';
import { rootRouter } from './utils/routing';
import { ToastProvider } from './components/Toast/ToastProvider';

function App() {
  return (
    <ToastProvider>
      <RouterProvider router={rootRouter} />
    </ToastProvider>
  );
}

export default App;
