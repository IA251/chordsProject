import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Button, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Link } from 'react-router-dom';


export default function SongTable() {
    const [songs, setSongs] = useState([]);
    const [selectedSong, setSelectedSong] = useState({
        id: 0,
        name: '',
        imageURL: null,
        lyrics: 'לחץ על שיר כדי לבחור',
        singers: []
    });

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


    const container = {
        width: '95%',
        margin: '0 auto',
        marginTop: '20px',
        textAlign: 'right',
        fontFamily: 'Roboto, sans-serif',
    }
    
    return (
        <div>
            <div style={{ width: '100%', height: '64px', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}></div>
            <Grid container spacing={2} style={{ ...container, alignItems: 'center', padding: '14px' }}>
                <Grid item xs={5} style={{ textAlign: 'center' }}><h1>עריכה והוספת שירים</h1></Grid>
                <Grid item xs={5}></Grid>
                <Grid item xs={2}>
                    <Link to={`../../AddSong`}>
                        <Button
                            variant="contained"
                            style={{ padding: '14px 35px' }}
                        >
                            העלאה
                            <CloudUploadIcon style={{ paddingRight: '8px' }} />
                        </Button></Link>
                </Grid>
            </Grid>
            <Grid container spacing={2} style={container}>
                <Grid item xs={5}>
                    <SongsList songs={songs} setSelectedSong={setSelectedSong} />
                </Grid>
                <Grid item xs={7}>
                    {selectedSong && <SongDetails song={selectedSong} />}
                </Grid>
            </Grid>
        </div>
    );
};

function SongsList({ songs, setSelectedSong }) {
    const songsList = {
        textAlign: 'right',
        borderBottom: '1px solid #ccc',
        cursor: 'pointer',
    }
    return (
        <List style={{ boxShadow: '0 4px 8px rgb(138 138 138 / 91%)' }}>
            {songs.map((song) => (
                <ListItem key={song.id} style={songsList}
                    onClick={() => setSelectedSong(song)}
                >

                    <ListItemAvatar>
                        <Link to={`../../Song/${song.id}`}>
                            <Avatar src={song.imageURL} alt={song.name} style={{
                                borderRadius: 'inherit',
                                width: 80,
                                height: 80,
                            }} />
                        </Link>
                    </ListItemAvatar>

                    <ListItemText
                        primary={song.name}
                        secondary={song.singers.map((singer) => ` ${singer.name}`)}
                        style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            marginRight: 10,
                        }} />
                    <Link to={`../../UpdateSong/${song.id}`}>
                        <IconButton>
                            <UpdateIcon />
                        </IconButton>
                    </Link>
                </ListItem>
            ))}
        </List>
    );
}

function SongDetails({ song }) {
    function handleDeleteSong() {
        axios.delete(`https://localhost:7108/api/Song/${song.id}`)
          .then(() => {
            alert(`מחקת בהצלחה את שיר מספר ${song.id} ${song.name}`)
            console.log(`Song with ID ${song.id} deleted successfully.`);
          })
          .catch(error => {
            console.error(`Error deleting song: ${error}`);
          });
      }

    return (
        <div style={{
            borderRadius: '10px',
            border: '11px solid rgb(235 235 235 / 55%)',
        }}>
            <Grid container style={{
                padding: '20px',
                backgroundColor: '#e7e7e75c',
                border: '4px solid #ffffff',
                boxShadow: 'rgba(161, 159, 159, 0.57) 0px 6px 12px',
            }}>
                <Grid item xs={6}>
                    <Link to={`../../Song/${song.id}`}>
                        <div style={{
                            background: `url(${song.imageURL}) center center / cover no-repeat`,
                            width: '100%',
                            height: '200px',
                        }}></div>
                    </Link >
                </Grid>
                <Grid item xs={6} style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}>
                    <div style={{
                        fontSize: '24px',
                        fontWeight: '700',
                    }}>{song.name}</div>
                    <div style={{
                        fontSize: '16px',
                        color: 'rgba(0, 0, 0, 0.4)',
                    }}>
                        {song.singers.map((singer, index) => (
                            <div key={index}>
                                &nbsp;<Link to={`../../Singer/${singer.id}`}>{singer.name}</Link>&nbsp;
                            </div>
                        ))}
                    </div>
                    <div style={{ padding: '18px' }}>
                        <Link to={`../../UpdateSong/${song.id}`}>
                            <Button variant="contained"style={{ margin: '0px 4px' }}>עריכה  <UpdateIcon style={{ paddingRight: '8px' }}/></Button>
                        </Link>
                        <Button variant="outlined" style={{ margin: '0px 4px' }} onClick={handleDeleteSong}>מחיקה  <DeleteIcon style={{ paddingRight: '8px' }}/></Button>
                    </div>
                </Grid>
            </Grid>
            <div style={{
                padding: '50px',
                textAlign: 'right',
                fontSize: '1rem',
                lineHeight: '1.6',
                color: 'rgb(51, 51, 51)',
                fontFamily: 'Courier New, Courier, monospace',
            }} dangerouslySetInnerHTML={{ __html: song.lyrics }}>
            </div>
        </div>
    );
}




