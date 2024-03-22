import React, { useState } from 'react';
import AuthService from '../../services/ProjectCoordinator/AuthService';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, Link, Container } from '@mui/material';


function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        AuthService.login(email, password).then(data => {
            if (data.role === 'ProjectCoordinator') {
                navigate('/dashboard'); // Note: useNavigate hook uses navigate for navigation in v6, not navigate.push
            } else {
                console.log('Not authorized or error in login');
            }
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={2} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
                    >
                        Login
                    </Button>
                    
                </Box>
            </Paper>
        </Container>
    );
}

export default LoginForm;
