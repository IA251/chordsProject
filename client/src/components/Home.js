import React, { useEffect, useState } from 'react';
import LandingPage from "./LandingPage";
import AllSongs from "./AllSongs";
import axios from 'axios';



export default function SongList() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://localhost:7108/api/Song');
        setSongs(response.data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <LandingPage songs={songs} />
      <AllSongs/>
    </div>
  );
}

