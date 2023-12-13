import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';

const containerStyle = {
  display: 'flex',
  width: '100%',
  height: '25vh',
  boxShadow: '0 14px 6px rgba(0, 0, 0, 0.1)',
};

const backgroundStyle = {
  flex: 1,
  display: 'flex',
  justifyContent: 'right',
  flexDirection: 'row-reverse',
};


const singerImageStyle = {
  width: '30vh',
  height: '30vh',
  borderRadius: '50%',
  boxShadow: '0 4px 60px rgba(0,0,0,.5)',
  border: '4px solid gray',
  marginTop: '5vh',
  marginLeft: '9vw',
};

const singerNameStyle = {
  fontSize: '5rem',
  color: 'white',
  textTransform: 'uppercase',
  display: 'flex',
  alignItems: 'center',
};

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

      // const background = `radial-gradient(rgb(${R},${G},${B}),rgb(${R},${G},${B}),#3f3f3f,#333)`;
      // const background = `linear-gradient(#3f3f3f,rgb(${R},${G},${B}),rgb(${R},${G},${B}))`;
      const background = `linear-gradient(to top, rgb(${R},${G},${B}), #000)`;


      resolve(background);
    };

    img.src = imagePath;
  });
}

function SongsOfSinger({ songs }) {
  const styles = {
    container: {
      margin: '60px 0px',
      display: 'flex',
      justifyContent: 'center',
    },
    card: {
      width: '160px',
      background: 'white',
      padding: '0.4em',
      borderRadius: '6px',
      boxShadow: '0px 2px 4px #80808070',
      margin: '10px',
    },
    cardImage: {
      backgroundColor: 'rgb(236, 236, 236)',
      width: '100%',
      height: '130px',
      borderRadius: '6px 6px 0 0',
      '&:hover': {
        transform: 'scale(0.98)',
      },
    },
    heading: {
      margin: '15px 0px',
      fontWeight: '600',
      color: 'rgb(88, 87, 87)',
      padding: '7px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer',
    },
    author: {
      color: 'gray',
      fontWeight: '400',
      fontSize: '11px',
      paddingTop: '20px',
    },
    name: {
      fontWeight: '600',
      '&:hover': {
        cursor: 'pointer',
      },
    },
  };

  return (
    <Grid container style={styles.container}>
      {songs.map((song, index) => (
        <Grid item xs={6} sm={3} md={2} key={index} style={styles.card}>
          <div
            style={{
              ...styles.cardImage,
              background: `url(${song.imageURL}) center center / cover no-repeat`,
            }}
          ></div>
          <Link to={`../../Song/${song.id}`} style={styles.heading}>
            {song.name}
            <VisibilityIcon />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}

export default function Singer() {
  const { id } = useParams();
  const [singer, setSinger] = useState(null);
  const [background, setBackground] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://localhost:7108/api/Singer/' + id);
        setSinger(response.data);

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

  if (!singer) {
    return null; // Render nothing or a loading indicator while fetching data
  }

  return (
    <div>
      <div style={{ ...containerStyle, background }}>
        <Container style={backgroundStyle}>
          <Typography variant="h1" style={singerNameStyle}>
            {singer.name}
          </Typography>
          <img src={singer.imageURL} alt="Singer" style={singerImageStyle} />
        </Container>
      </div>
      <div style={{minHeight:'500px',}}>
      <SongsOfSinger songs={singer.songs}/>
      </div>
    </div>
  );
}



