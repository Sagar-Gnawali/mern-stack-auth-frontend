import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { Link } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, makeStyles, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
const myStyles = makeStyles({
    paper: {
        display: 'flex',
        height: '400px',
        width: '600px',
        margin: '50px auto',
        backgroundColor: '#f4f4f4'
    },
    input: {
        margin: '10px 200px',
    },
    btn: {
        margin: 'auto 230px'
    },
    main: {
        marginTop: '60px'
    },
    register: {
        marginLeft: '230px',
        cursor: 'pointer'
    }
})
const Login = (props) => {
    const classes = myStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError(false);
        setPasswordError(false);
        if (!email) {
            setEmailError(true);
        }
        if (!password) {
            setPasswordError(true);
        }
        try {
            const response = await axios.post('http://localhost:8000/auth/login', { email, password }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log('response containes the ', response);
            localStorage.setItem('token', response.data.token);
            props.history.push('/');
        } catch (error) {
            console.log('error while login into the dashboard', error)
        }
    }
    return (
        <Container maxWidth="sm" >
            <Card className={classes.paper}>
                <CardContent >
                    <div className={classes.main}>
                        <form onSubmit={handleSubmit}>
                            <TextField error={emailError} type="text" variant="standard"
                                placeholder="username" className={classes.input}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField type="password" error={passwordError} placeholder="password"
                                className={classes.input}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <CardActions>
                                <Button type="submit" variant="contained"
                                    className={classes.btn}
                                    color="primary" endIcon={<LockOpenIcon />} >Login
                                </Button>
                            </CardActions>
                            <Typography variant="body2" className={classes.register}>
                                Not a user ?<Link to="/register">Register</Link>
                            </Typography>
                        </form>

                    </div>

                </CardContent>
            </Card>
        </Container>
    )
}
export default Login;
