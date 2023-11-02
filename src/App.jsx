import React, { useState } from 'react';
import Content from './components/Content';
import Header from './components/Header';

function App() {
  const [cityName, setCityName] = useState('');

  const handleSetCityName = (name) => {
    setCityName(name);
  };

  return (
    <>
      <Header setCityName={handleSetCityName} />
      <Content cityName={cityName} />
    </>
  );
}

export default App;