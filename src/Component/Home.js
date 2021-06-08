import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import { Button, Card, CardActions, CardContent, makeStyles, TextField, Typography } from '@material-ui/core';
const myStyles = makeStyles({
    card: {
        display: 'flex',
        height: '300px',
        margin: '2% auto',
        width: '250px',
        backgroundColor: 'wheat'
    },
    main:{
        margin:'30% auto'
    }
   
})
const Home = (props) => {
    const classess = myStyles();
    const [user, setUser] = useState(null);
    const getUser = async () => {
        const response = await axios.get('http://localhost:8000/auth', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        setUser(response.data);
        console.log('respionse is ',response)
    }
    useEffect(() => {
        getUser();
    }, []);
    const handleSubmit = () => {
        localStorage.removeItem('token');
        props.history.push('/login');
    }
    if (!localStorage.getItem('token')) {
        props.history.push('/login');
    }
    return (
        <Container maxWidth="sm">
            <Card className={classess.card}>
                <div className={classess.main}>

                    <Typography variant="h6" >Welcome <span style={{color:'blue',fontWeight:'bold'}}>{user && user.name}</span></Typography>
                    <CardActions>
                        <Button onClick={handleSubmit} color="secondary" variant="contained" >Logout</Button>
                    </CardActions>
                </div>
            </Card>
        </Container>
    )
}
export default Home;
