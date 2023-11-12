import React, {FC, PropsWithChildren} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import {BrowserRouter, HashRouter} from "react-router-dom";

const Router: FC<PropsWithChildren> = ({children}) => {
  return process.env.NODE_ENV === 'development' ? <HashRouter>{children}</HashRouter> : <BrowserRouter>{children}</BrowserRouter>;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)
