import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

function getAccessToken(callback) {
    // Your Spotify application credentials
    const clientId = '072e873c698c4088872d52068361bf24';
    const clientSecret = '2a138c0b9e3f424cba4f5622b5d0e584';

    // Create a base64-encoded string of your client ID and client secret
    const base64Credentials = btoa(`${clientId}:${clientSecret}`);

    // Prepare the request data
    const requestData = new URLSearchParams();
    requestData.append('grant_type', 'client_credentials');

    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${base64Credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: requestData,
    })
        .then((response) => response.json())
        .then((data) => {
            callback(data.access_token);
            // You can use the access token to make authenticated requests to the Spotify API.
        })
        .catch((error) => {
            console.error('Error obtaining access token:', error);
        });
}

const styles = {
    container: {
        textAlign: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    input: {
        width: '300px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        margin: '5px',
        textAlign: 'right',
        direction: 'rtl',
    },
    button: {
        backgroundColor: '#1db954',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        margin: '0 4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    searchResults: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#f8f8f8',
        border: '1px solid #ddd',
        borderRadius: '5px',
        padding: '20px',
        margin: '20px 0px',
    },
    trackImage: {
        maxWidth: '100%',
        height: 'auto',
    },
    singerProfile: {
        width: '6vh',
        height: '6vh',
        borderRadius: '50%',
        boxShadow: 'rgba(0, 0, 0, 0.5) 0px 4px 60px',
        border: '1px solid white',
        margin: '0px 0.5em',
    },
    songDataText: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2.3vh',
    }
};


function SpotifySearch({ song }) {
    const [accessToken, setAccessToken] = useState('');
    const [songName, setSongName] = useState(song.name); //from input
    const [artistName, setArtistName] = useState(''); //from input
    const [searchResults, setSearchResults] = useState([]);
    const [artists, setArtists] = useState(song.singers);
    const [fileContent, setFileContent] = useState(song.lyrics);
    const songToUpdate = song;


    useEffect(() => {
        getAccessToken(setAccessToken);
        if (searchResults.length > 0) {
            songToUpdate.name = searchResults[0].name;
            songToUpdate.imageURL = searchResults[0].album.images[0].url;
        }
        if (artists.length > 0) {
            songToUpdate.singers = artists;
        }

        if (fileContent !== '') {
            songToUpdate.lyrics = fileContent;
        }
    }, [searchResults, artists, fileContent, songToUpdate]);

    async function updateSong() {
        try {
            await axios.put('https://localhost:7108/api/Song/' + song.id, songToUpdate);
            alert("השיר עודכן בהצלחה");
            console.log(songToUpdate);
        } catch (error) {
            console.error('Error fetching songs:', error);
        }
    }

    function handleFileUpload(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const fileContent = event.target.result;
                setFileContent(fileContent);
            };
            reader.readAsText(file);
        }
    };

    async function handleSearch(e) {
        e.preventDefault();
        if (songName.trim() === '') {
            alert('הכנס שם שיר');
            return;
        }
        try {
            const query = `track:${songName} ${artistName}`.trim();
            const spotifyApiEndpoint = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`;
            const response = await axios.get(spotifyApiEndpoint, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const searchResults = response.data.tracks.items;

            if (searchResults.length > 0) {
                const artistsFromResult = searchResults.map(result => result.artists);

                const artistInfoPromises = artistsFromResult[0].map(async artist => {
                    const artistInfoResponse = await axios.get(`https://api.spotify.com/v1/artists/${artist.id}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    return artistInfoResponse.data;
                });

                const artistInfoArray = await Promise.all(artistInfoPromises);

                setSearchResults(searchResults);
                setArtists(artistInfoArray.map(artist => ({
                    id: 0,
                    name: artist.name,
                    imageURL: artist.images[0].url,
                    songs: [],
                })));
                setArtistName(artistInfoArray[0].name);
            }
            else{
                alert("השיר לא נמצא");
              }
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };


    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            updateSong(songToUpdate);
        }} style={styles.container}>
            <h1>הכנס שם שיר, זמר ומילים</h1>
            <input
                type="file"
                style={styles.input}
                onChange={handleFileUpload}
                accept=".txt"
                required={!fileContent}
            />
            <input
                type="text"
                placeholder="הכנס שם שיר"
                value={songName}
                onChange={(e) => setSongName(e.target.value)}
                style={styles.input}
                required
            />
            <input
                type="text"
                placeholder="הכנס שם זמר (אופציונלי)"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
                style={styles.input}
            />

            <button
                onClick={handleSearch}
                style={styles.button}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#1ed760')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#1db954')}
            >
                חפש
            </button>
            <input
                type="submit"
                value={"עדכן"}
                style={styles.button}
            />
            <div style={styles.searchResults}>
                {fileContent && (
                    <div style={{ flex: '1', }}>
                        <h2>העלאה של מילים</h2>
                        <pre style={{ textAlign: 'right', padding: '10px 70px',fontFamily:'"Courier New", Courier, monospace' }} dangerouslySetInnerHTML={{ __html: fileContent }}></pre>
                    </div>
                )}
                {searchResults.length > 0 ? (
                    <div style={{ flex: '1' }}>
                        <h2>תוצאות חיפוש השיר</h2>
                        <h3>{searchResults[0].name}</h3>
                        <div style={styles.songDataText}>
                            {artists.map((artist, index) => (
                                <div key={index} style={{ display: 'flex' }}>
                                    <img
                                        src={artist.imageURL}
                                        alt={artist.name}
                                        style={styles.singerProfile}
                                    />
                                    <h3>{artist.name}</h3>
                                </div>
                            ))}

                        </div>
                        <img
                            src={searchResults[0].album.images[0].url}
                            alt={searchResults[0].name}
                            style={styles.trackImage}
                        />
                    </div>
                ) :
                    <div style={{ flex: '1' }}>
                        <h2>תוצאות חיפוש השיר</h2>
                        <h3>{songToUpdate.name}</h3>
                        <div style={styles.songDataText}>
                            {songToUpdate.singers.map((singer, index) => (
                                <div key={index} style={{ display: 'flex' }}>
                                    <img
                                        src={singer.imageURL}
                                        alt={singer.name}
                                        style={styles.singerProfile}
                                    />
                                    <h3>{singer.name}</h3>
                                </div>
                            ))}
                        </div>
                        <img
                            src={songToUpdate.imageURL}
                            alt={songToUpdate.name}
                            style={styles.trackImage}
                        />
                    </div>}

            </div>
        </form>
    );
}


export default function UpdateSong() {
    const [song, setSong] = useState(null)
    const { id } = useParams();
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('https://localhost:7108/api/Song/' + id + "/+0?order=no");
                setSong(response.data);
            } catch (error) {
                console.error('Error fetching song:', error);
            }
        }

        fetchData();
    }, [id]);
    return (
        <div>
            <div style={{ width: '100%', height: '64px', backgroundColor: 'rgb(0,0,0,0.6)' }}></div>
            {song && <SpotifySearch song={song} />}
        </div>
    );
}


