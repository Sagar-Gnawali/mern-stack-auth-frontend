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
        margin: '10px 200px'
    },
    btn: {
        margin: 'auto 210px'
    },
    main: {
        marginTop: '60px'
    },
    register: {
        marginLeft: '180px',
        cursor: 'pointer'
    }
})
const Register = (props) => {
    const classes = myStyles();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setNameError(false);
        setEmailError(false);
        setPasswordError(false);
        if (!name) {
            setNameError(true);
        }
        if (!email) {
            setEmailError(true);
        }
        if (!password) {
            setPasswordError(true);
        }
        try {
            const res = await axios.post('http://localhost:8000/auth/register', { name, email, password }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            props.history.push('/login');
        } catch (error) {
            console.log('something went wrong while registering');
        }
    }
    return (
        <Container maxWidth="sm" >
            <Card className={classes.paper}>
                <CardContent >
                    <div className={classes.main}>
                        <form onSubmit={handleSubmit}>
                            <TextField error={nameError} type="text" variant="standard"
                                placeholder="username" className={classes.input}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField error={emailError} type="text" variant="standard"
                                placeholder="email" className={classes.input}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField type="password" error={passwordError} placeholder="password"
                                className={classes.input}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <CardActions>
                                <Button type="submit" variant="contained"
                                    className={classes.btn}
                                    color="primary" endIcon={<LockOpenIcon />} >Register
                                </Button>
                            </CardActions>
                            <Typography variant="body2" className={classes.register}>
                                Already have an account ? <Link to="/login">Login</Link>
                            </Typography>
                        </form>

                    </div>

                </CardContent>
            </Card>
        </Container>
    )
}
export default Register;
