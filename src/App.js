// import React from react
import * as React from 'react';

// import Routes and Route from react router dom
import { Routes, Route } from 'react-router-dom';

// import App.css
import './App.css';

// import components
import Header from './components/Header';
import Footer from './components/Footer';

// import pages
import Home from './pages/Home';
import Pokemon from './pages/Pokemon';


// Create App
function App() {

  // Set homepage url
  const url = '/';

  // return JSX
  return (
    <div className="App">
        {/* Add Header */}
        <Header className="d-grid align-items-center">
          <h1>POKEDEX</h1>
        </Header>
        {/* Add Routes to Home and Pokemon page with pokemonNum as the path parameter */}
        <Routes>
          <Route path = {url} element={<Home />}/>
          <Route path = {`${url}pokemon/:pokemonNum`} element={<Pokemon />}/>
        </Routes>
        {/* Add Footer */}
        <Footer/>
    </div>
  );
}

export default App;
