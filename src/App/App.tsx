import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import DataListPage from "pages/DataListPage";
import DataItemPage from "pages/DataItemPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={ <DataListPage /> } />
        <Route path='/data'>
          <Route path=':id' element={ <DataItemPage /> }/>
        </Route>
        <Route path='*' element={ <Navigate to='/' replace /> } />
      </Routes>
    </HashRouter>
  )
}

export default App;
