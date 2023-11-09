import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import DataListPage from "pages/DataListPage";
import DataItemPage from "pages/DataItemPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <DataListPage /> } />
        <Route path='/data'>
          <Route path=':id' element={ <DataItemPage /> }/>
        </Route>
        <Route path='*' element={ <Navigate to='/' replace /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
