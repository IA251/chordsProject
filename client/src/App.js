// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import AllSongs from './components/AllSongs';
import Song from "./components/Song";
import Singer from './components/Singer';
import SongsEdit from "./components/SongsEdit";
import AddSong from "./components/AddSong";
import UpdateSong from './components/UpdateSong';


function App() {
  const [isAdmin, setAdmin] = useState(false);

  return (
    <Router>
      <Header isAdmin={isAdmin} setAdmin={setAdmin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/AllSongs' element={<AllSongs />} />
        <Route path='/Singer/:id' element={<Singer />} />
        <Route path='/Song/:id' element={<Song />} />

        {isAdmin && <Route path='/SongsEdit' element={<SongsEdit />} />}
        {isAdmin && <Route path='/AddSong' element={<AddSong />} />}
        {isAdmin && <Route path='/UpdateSong/:id' element={<UpdateSong />} />}

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;


