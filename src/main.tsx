import React, {FC, PropsWithChildren} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import {BrowserRouter, HashRouter} from "react-router-dom";
import store from './store';
import { Provider } from "react-redux";

const Router: FC<PropsWithChildren> = ({children}) => {
  return process.env.NODE_ENV === 'development' ? <HashRouter basename='/'>{children}</HashRouter> : <BrowserRouter basename='/'>{children}</BrowserRouter>;
}

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
)
