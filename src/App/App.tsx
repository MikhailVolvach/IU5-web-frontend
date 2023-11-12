import {Navigate, Route, Routes} from "react-router-dom";

import DataListPage from "pages/DataListPage";
import DataItemPage from "pages/DataItemPage";

function App() {
  return (

      <Routes>
        <Route path='/' element={ <DataListPage /> } />
        <Route path='/data'>
          <Route path=':id' element={ <DataItemPage /> }/>
        </Route>
        <Route path='*' element={ <Navigate to='/' replace /> } />
      </Routes>
  )
}

export default App;
