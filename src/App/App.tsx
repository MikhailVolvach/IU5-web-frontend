import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";

import DataListPage from "pages/DataListPage";
import DataItemPage from "pages/DataItemPage";
import {useCallback} from "react";
import RequestItemPage from "pages/RequestItemPage";
import RequestItemPageWithId from "pages/RequestItemPageWithId";
import RequestsListPage from "pages/RequestsListPage";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const handleSetQuery = useCallback((value: string) => {
    queryParams.set('search', value);
    navigate(`${location.pathname}?${queryParams.toString()}`);
  }, []);

  return (
      <Routes>
        <Route 
          path='/' 
          element={ <DataListPage searchQuery={queryParams.get('search') || ''} searchQueryChange={handleSetQuery} /> } 
        />
        <Route
          path='/data'
          element={<Navigate to='/' replace />}
        />
        <Route
          path='/data/:id'
          element={<DataItemPage />}
        />
        <Route path='/request/:id/*' element={ <RequestItemPageWithId /> } />
        <Route path='/draft-request/*' element={ <RequestItemPage /> }/>
        <Route path='/requests' element={ <RequestsListPage /> }/>
      </Routes>
  )
}

export default App;
