import React, { useState } from 'react';
import CdList from './CdList';


export default function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
     
      <CdList searchTerm={searchTerm} />
    </div>
  );
}