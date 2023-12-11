import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";

import DataListPage from "pages/DataListPage";
import DataItemPage from "pages/DataItemPage";
import {useCallback} from "react";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // const [query, setQuery] = useState<string>(queryParams.get('data_search') || '');

  const handleSetQuery = useCallback((value: string) => {
    queryParams.set('data_search', value);
    navigate(`${location.pathname}?${queryParams.toString()}`)
  }, []);

  return (
      <Routes>
        <Route path='/data' element={ <DataListPage searchQuery={queryParams.get('data_search') || ''} searchQueryChange={handleSetQuery} /> } />
        <Route path='/data' >
          <Route path=':id' element={ <DataItemPage /> }/>
        </Route>
        <Route path='*' element={ <Navigate to='/data' replace /> } />
      </Routes>
  )
}

export default App;
