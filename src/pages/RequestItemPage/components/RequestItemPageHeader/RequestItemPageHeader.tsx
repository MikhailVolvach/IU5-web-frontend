import HeaderWithSearch from 'layout/HeaderWithSearch';
import { FormEvent, ChangeEvent, FC, useCallback } from 'react';

interface IHeaderWithSearch {
  searchValue?: string;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  onSearchChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  requestId?: number | null;
}

const RequestItemPageHeader : FC<IHeaderWithSearch> = ({ searchValue = '', onSubmit = () => {return}, onSearchChange = () => {return}, requestId = -1}) => {
  const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event);
  }, []);

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    onSubmit(event);
  }, []);

  return (
    <HeaderWithSearch 
      searchValue={searchValue}
      onSubmit={handleSubmit}
      onSearchChange={handleSearchChange}
      requestId={requestId}
      />
  )
}

export default RequestItemPageHeader;