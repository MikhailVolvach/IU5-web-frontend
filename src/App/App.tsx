import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";

import DataListPage from "pages/DataListPage";
import DataItemPage from "pages/DataItemPage";
import {useCallback} from "react";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const handleSetQuery = useCallback((value: string) => {
    queryParams.set('search', value);
    console.log(location.pathname, queryParams.toString());
    navigate(`${location.pathname}?${queryParams.toString()}`);
  }, []);

  return (
      <Routes>
        <Route path='/' element={ <DataListPage searchQuery={queryParams.get('search') || ''} searchQueryChange={handleSetQuery} /> } />
        <Route path='/data' >
          <Route path=':id' element={ <DataItemPage /> }/>
        </Route>
        <Route path='*' element={ <Navigate to='/' replace /> } />
      </Routes>
  )
}

export default App;
