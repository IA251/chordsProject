import React, { useEffect, useState, } from 'react';
import { Container, Grid, Paper, Button, Typography, Link } from '@mui/material';
import { useParams } from 'react-router';
import axios from 'axios';


function getColor(imagePath, ratio) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';

    img.onload = function () {
      const canvas = document.createElement('canvas');
      let width = (canvas.width = img.width);
      let height = (canvas.height = img.height);
      const context = canvas.getContext('2d');
      context.drawImage(img, 0, 0);

      let data, length;
      let i = -4,
        count = 0;

      try {
        data = context.getImageData(0, 0, width, height);
        length = data.data.length;
      } catch (error) {
        console.error(error);
        reject(error);
        return;
      }

      let R = 0,
        G = 0,
        B = 0;

      while ((i += ratio * 4) < length) {
        ++count;
        R += data.data[i];
        G += data.data[i + 1];
        B += data.data[i + 2];
      }

      R = ~~(R / count);
      G = ~~(G / count);
      B = ~~(B / count);


      const background = `rgb(${R},${G},${B})`;

      resolve(background);
    };

    img.src = imagePath;
  });
}


function SongMain({ song }) {
  const containerStyle = {
    height: '50vh',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#000',
    overflow: 'hidden',
  };

  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center center',
    filter: 'brightness(70%)', // Darken the image
  };

  const gradientOverlayStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), transparent)',
  };

  const textContainerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    color: 'white',
  };

  const singerImageStyle = {
    width: '5vh',
    height: '5vh',
    borderRadius: '50%',
    boxShadow: '0 4px 60px rgba(0,0,0,.5)',
    border: '1px solid white',
    margin: '0 0.5em',
  };

  const songNameStyle = {
    fontSize: '4.5em',
    fontWeight: 'bold',
    marginBottom: '10px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  };

  const singerProfile = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row-reverse',
    fontSize: '1.5em',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
  };

  return (
    <div style={containerStyle}>
      <img src={song.imageURL} alt="SongImage" style={imgStyle} />
      <div style={{ ...gradientOverlayStyle }}></div>

      <div style={textContainerStyle}>
        <div style={songNameStyle}>{song.name}</div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {song.singers.map((singer, index) => (
            <div key={index} style={singerProfile}>
              <Link href={`../../Singer/${singer.id}`} style={{ textDecoration: 'none', color: 'white', marginTop: '6px' }}>
                {singer.name}
              </Link>
              <img src={singer.imageURL} alt="Singer" style={singerImageStyle} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SongData({ song, colorDo }) {
  const [transpose, setTranspose] = useState(0);
  const [signTranspose, setSignTranspose] = useState('+');
  const [lyrics, setLyrics] = useState(song.lyrics);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [version, setVersion] = useState('R');

  useEffect(() => {
    async function handleTranspose() {
      try {
        const response = await axios.get(`https://localhost:7108/api/Song/${song.id}/${signTranspose}${transpose}`);
        setLyrics(response.data.lyrics);
      } catch (error) {
        console.error('Error fetching song to change transpose:', error);
      }
    }
    handleTranspose();

    const handleScroll = () => {
      const distanceFromBottom = document.body.scrollHeight - (window.scrollY + window.innerHeight);
      // Adjust the margin based on the distance from the bottom
      const marginTop = Math.max(-distanceFromBottom + 180, 0);
      setScrollPosition(marginTop);
    };
    window.addEventListener('scroll', handleScroll);
    return () => { window.removeEventListener('scroll', handleScroll); };
  }, [transpose, signTranspose, song.id]);


  function handleUp() {
    setVersion('T');
    setTranspose(transpose + 0.5);
    transpose + 0.5 < 0 ? setSignTranspose('-') : setSignTranspose('+');
  }

  function handleDown() {
    setVersion('T');
    setTranspose(transpose - 0.5);
    transpose + 0.5 < 0 ? setSignTranspose('-') : setSignTranspose('+');
  }

  async function handleEasy() {
    try {
      setVersion('E');
      const response = await axios.get(`https://localhost:7108/api/Song/${song.id}/easy`);
      setTranspose(Number(response.data.substring(1)));
      setSignTranspose(response.data[0])
    } catch (error) {
      console.error('Error fetching song to up transpose:', error);
    }
  }

  function handleRegualr() {
    setVersion('R');
    setTranspose(0);
    setSignTranspose('+');
  }

  const containerStyles = {
    paddingTop: '2rem',
    position: 'relative',
    marginBottom: '100px',
  };

  const leftPanelStyles = {
    position: 'fixed',
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: '12px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    width: '20%',
    marginTop: `-${scrollPosition}px`,
  };

  const buttonStyles = {
    margin: '1rem 0',
    width: '100%',
    padding: '1rem 2rem',
    backgroundColor: colorDo,
    color: 'white',
  };

  const rightPanelStyles = {
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    marginLeft: '20%',
  };

  const lyricsStyles = {
    textAlign: 'right',
    fontFamily: 'Courier New, Courier, monospace',
    fontSize: '1.2rem',
    lineHeight: '1.6',
    color: '#333',
  };

  return (
    <Container style={containerStyles}>
      <Grid container spacing={3}>
        {/* Right Panel */}
        <Grid item xs={9}>
          <Paper style={rightPanelStyles}>
            <Typography variant="body1" style={lyricsStyles} dangerouslySetInnerHTML={{ __html: lyrics }}>

            </Typography>
          </Paper>
        </Grid>
        {/* Left Panel */}
        <Grid item xs={3}>
          <Paper style={leftPanelStyles}>
            <Typography variant="h5" gutterBottom>
              Controls
            </Typography>
            <Button style={buttonStyles} onClick={handleUp} color="primary">+</Button>
            <Button style={buttonStyles} onClick={handleDown} color="secondary">-</Button>
            {version === 'E' ?
              <Button style={buttonStyles} onClick={handleRegualr} color="secondary">גרסה רגילה</Button> :
              <Button style={buttonStyles} onClick={handleEasy} color="secondary">גרסה קלה</Button>
            }
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}


export default function Song() {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [background, setBackground] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://localhost:7108/api/Song/' + id + "/+0");
        setSong(response.data);
        getColor(response.data.imageURL, 4)
          .then((color) => {
            setBackground(color);
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error('Error fetching singer:', error);
      }
    }

    fetchData();
  }, [id]);

  if (!song) {
    return null;
  }
  return (
    <div>
      <SongMain song={song} />
      <SongData song={song} colorDo={background} />
    </div>
  );
}

