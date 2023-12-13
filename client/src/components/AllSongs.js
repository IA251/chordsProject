import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';


const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    padding: '20px',
  },
  card: {
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  img: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '10px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  singers: {
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    fontSize: '14px',
    color: '#666',
  },
};

export default function SongTable() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get('https://localhost:7108/api/Song');
        setSongs(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSongs();
  }, []);

  return (
    <div style={styles.container}>
      {songs.map((song, index) => (
        <Card key={index} style={styles.card}>
          <Link to={`../../Song/${song.id}`}>
            <img src={song.imageURL} alt={song.name} style={styles.img} />
          </Link>
          <CardContent>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" style={{ fontWeight: '600' }}>
                <Link to={`../../Song/${song.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                  {song.name}</Link>
              </Typography>&nbsp;&nbsp;
              {song.singers.map((singer, index) => (
                <Link to={`../../Singer/${singer.id}`} key={singer.id} style={{ textDecoration: 'none', color: 'black' }}>
                  <div style={styles.singers} key={index}>&nbsp;&#11049;&nbsp;{singer.name}</div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

