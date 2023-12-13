import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';

export default function LoginAdmin({ isAdmin, setAdmin, openDialog, handleCloseDialog }) {
    const [username, setUsername] = useState('');
    const [isUsername, setIsUsername] = useState(false);
    const [password, setPassword] = useState('');
    const [isPassword, setIsPassword] = useState(false);
    const [isMistake, setIsMistake] = useState(false);


    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://localhost:7108/Admin', {
                username,
                password,
            });
            if (response.data) {
                setIsMistake(false)
                setAdmin(true);
                handleCloseDialog();
            } else {
                setIsMistake(true)
                console.error('שם משתמש או סיסמא שגויים');
            }
        } catch (error) {
            console.error('Error in login:', error);
        }
    };

    const wrapStyle = {
        width: '290px',
        background: '#fff',
        borderRadius: '10px',
        overflow: 'hidden',
        padding: '66px 55px 40px',
        boxShadow: '0 5px 10px 0px rgba(0, 0, 0, 0.1)',
    };

    const formTitleStyle = {
        display: 'block',
        fontSize: '30px',
        color: '#333333',
        lineHeight: '1.2',
        textAlign: 'center',
        marginBottom: '35px',
        fontWeight: 'bold',
    };

    const signinBtn = {
        width: '100%',
        height: '45px',
        fontSize: 'large',
        fontWeight: 'bold',
        marginTop: '30px',
        color: 'white',
        background: 'linear-gradient(to right, #21d4fd, #b721ff)',
        borderRadius: '25px',
    };

    return (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogContent style={wrapStyle}>
                <DialogTitle style={formTitleStyle}>כניסת מנהל</DialogTitle>
                <form onSubmit={handleLogin} style={{ width: '100%', direction: 'rtl' }}>
                    <div style={{ position: 'relative', padding: '15px 0', marginTop: '10px', }}>
                        <div style={{
                            position: 'relative',
                            padding: '15px 0',
                            marginTop: '10px',
                        }}>
                            <TextField
                                type="text"
                                label="הכנס שם משתמש"
                                variant="filled"
                                fullWidth
                                InputProps={{
                                    disableUnderline: true,
                                }}
                                InputLabelProps={{
                                    style:
                                    {
                                        width: '100%',
                                        direction: 'ltr',
                                        textAlign: 'right',
                                        left: isUsername || username ? '50px' : 0,
                                    }
                                }}
                                value={username}
                                onChange={(event) => { setUsername(event.target.value); }}
                                onFocus={() => { setIsUsername(true); }}
                                onBlur={() => { setIsUsername(false); }}
                                required
                            />
                        </div>
                        <div style={{
                            position: 'relative',
                            padding: '15px 0',
                            marginTop: '10px',
                        }}>
                            <TextField
                                type="password"
                                label="הכנס סיסמא"
                                variant="filled"
                                fullWidth
                                InputProps={{
                                    disableUnderline: true,
                                }}
                                InputLabelProps={{
                                    style:
                                    {
                                        width: '100%',
                                        direction: 'ltr',
                                        textAlign: 'right',
                                        left: isPassword || password ? '50px' : 0,
                                    }
                                }}
                                value={password}
                                onChange={(event) => { setPassword(event.target.value); }}
                                onFocus={() => { setIsPassword(true); }}
                                onBlur={() => { setIsPassword(false); }}
                                required
                            />
                        </div>
                    </div>
                    {isMistake && <div style={{ color: 'red' }}>שם המשתמש או הסיסמא שגויים</div>}
                    <DialogActions>
                        <Button style={signinBtn} type="submit">
                            כניסה
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};
