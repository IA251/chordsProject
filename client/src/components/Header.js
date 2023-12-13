// Header.js
import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import LoginAdmin from './LoginAdmin';
import { Link } from 'react-router-dom';


export default function Header({ isAdmin, setAdmin }){
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const headerStyle = {
    position: isScrolled ? 'fixed' : 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: isScrolled ? 'rgb(66,66,66,0.88)' : 'transparent',
    color: 'white',
    zIndex: 1000,
  };

  return (
    <AppBar position="static" style={headerStyle}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, fontFamily: 'cursive' }}>
          <Link to={'/'} style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>MC אקורד מסטאר</Link>
        </Typography>
        <Button color="inherit">
          <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>בית</Link>
        </Button>
        {isAdmin &&
          <Link to={'../../AddSong'}>
            <Button color="inherit" style={{ textDecoration: 'none', color: 'white' }}>העלאה</Button>
          </Link>
        }
        {isAdmin &&
          <Link to={'../../SongsEdit'}>
            <Button color="inherit" style={{ textDecoration: 'none', color: 'white' }}>עריכה</Button>
          </Link>
        }
        {isAdmin ?
          <div style={{ fontWeight: 'bold',margin: '0px 14px' }}>היי מנהל</div> :
          <Button color="inherit" onClick={handleOpenDialog}>כניסה</Button>
        }
        <LoginAdmin isAdmin={isAdmin} setAdmin={setAdmin} openDialog={openDialog} handleCloseDialog={handleCloseDialog} />
      </Toolbar>
    </AppBar>
  );
};

