import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";

import DataListPage from "pages/DataListPage";
import DataItemPage from "pages/DataItemPage";
import {useCallback} from "react";
import RequestItemPage from "pages/RequestItemPage";
// import RequestItemPage from "pages/RequestItemPage";

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
          element={<Navigate to='/' replace />} // Перенаправление на корневой маршрут при посещении /data
        />
        <Route
          path='/data/:id'
          element={<DataItemPage />}
        />
        <Route path='/request/*' element={ <RequestItemPage /> }/>
        {/* <Route path='*' element={ <Navigate to='/' replace /> } /> */}
      </Routes>
  )
}

export default App;
