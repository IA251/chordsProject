import React from 'react';
import LandingImage from "../images/homechords.jpg";
import { Autocomplete, TextField } from '@mui/material';
import { Link } from 'react-router-dom';


export default function LandingPage({ songs }) {
  const landingPageStyle = {
    position: 'relative', // Make the parent div a positioning context
    background: `url(${LandingImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center',
    fontFamily:'cursive',
  };
  
  const overlayStyle = {
    content: '',
    background: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value to control darkness
    position: 'absolute',
    width: '100%',
    height: '100%',
  };
  
  const headingStyle = {
    fontSize: '3rem',
    marginBottom: '20px',
    zIndex: 1, 
  };
  
  const sloganStyle = {
    fontSize: '1.5rem',
    marginBottom: '20px',
    fontFamily:'system-ui',
    zIndex: 1, 
  };

  return (
    <div style={landingPageStyle}>
      <div style={overlayStyle}></div>
      <h1 style={headingStyle}> MC אקורד מסטאר</h1>
      <p style={sloganStyle}>מאגר אקורדים בשבילך</p>
      <Autocomplete
        dir='rtl'
        style={{ width: '75%', direction: 'rtl', }}
        options={songs}
        getOptionLabel={(option) => option.name}
        noOptionsText={"לא נמצאו תוצאות מתאימות"}
        renderOption={(props, option) => (
          <div key={option.id} style={{ direction: 'rtl', display: 'flex', padding: '8px 3px' }}>
            <Link key={option.id} to={`../../Song/${option.id}`} style={{ textDecoration: 'none' }}>
              <div style={{ color: 'black', fontWeight: 'bold', padding: '0px 10px', }}>{option.name}</div>
            </Link>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
              {option.singers.map((singer) => (
                <span key={singer.id}>
                  <Link to={`../../Singer/${singer.id}`} style={{ textDecoration: 'none', color: 'rgb(109, 94, 97)' }}>
                    &#11049;{singer.name}
                  </Link>&nbsp;
                </span>))}
            </div>
          </div>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="חפש ..."
            variant="standard"
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,
              style: {
                direction: 'rtl',
                padding: "0.7rem 50px",
                backgroundColor: 'white',
                borderRadius: '3px'
              }
            }}
          />
        )}
      />
    </div>
  );
}

