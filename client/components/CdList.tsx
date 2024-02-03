import React, { useState, useEffect, useMemo } from 'react';
import { getCdData } from '../apiClient';
import TracksModal from './TracksModal';
import SearchForm from './SearchForm'; 

function CdList() {
  const [cds, setCds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTracks, setSelectedTracks] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    setIsLoading(true);
    getCdData()
      .then(data => {
        setCds(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message || 'An error occurred');
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  const handleCdClick = (tracks) => {
    setSelectedTracks(tracks);
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedAndFilteredCds = useMemo(() => {
    return cds.filter(cd =>
      cd.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cd.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cd.year ? cd.year.toString().includes(searchTerm) : false)
    ).sort((a, b) => {
      if (sortConfig.key === null) return 0;
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [cds, searchTerm, sortConfig]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error}</div>;

  return (
    <div>
      <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <h2>CD List</h2>
      <div>
        <button onClick={() => requestSort('title')}>Sort by Title</button>
        <button onClick={() => requestSort('artist')}>Sort by Artist</button>
        <button onClick={() => requestSort('year')}>Sort by Year</button>
      </div>
      <ul>
        {sortedAndFilteredCds.map(cd => (
          <li key={cd.id} onClick={() => handleCdClick(cd.tracks)}>
            <strong>Title:</strong> {cd.title}<br />
            <strong>Artist:</strong> {cd.artist}<br />
            <strong>Year:</strong> {cd.year ?? 'N/A'}
          </li>
        ))}
      </ul>
      {selectedTracks && <TracksModal tracks={selectedTracks} onClose={() => setSelectedTracks(null)} />}
    </div>
  );
}

export default CdList;
