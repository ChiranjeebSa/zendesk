import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";
import { Button } from '@material-ui/core';
import banner from './assets/Login_Banner.png'



function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
        height: '10vh',
        backgroundColor: "#41b4e8"
    },
    root: {
        height: '89vh',
         backgroundColor: 'white',
    },
    title: {
        fontSize: "40px"
    },

    image: {
        backgroundImage: `url(${banner})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'cover',
        flexShrink: '0',
        minHeight: '100%',
        backgroundPosition: 'center'
    },
    paper: {
        margin: '0px 54px',
        padding: "32px",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: 'inherit',
        background: 'inherit'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        marginTop: 'auto',
        position: 'fixed',
        left: '0px',
        bottom: '0px',
        right: '0px'
    },
}));

function SignIn(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <header >
                <AppBar position="absolute" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            ESTUATE
          </Typography>
                    </Toolbar>
                </AppBar>
            </header>
            <main>
                <Grid container component="main" className={classes.root} >
                    <Grid item xs={12} sm={8} md={5} elevation={6} square>
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
          </Typography>
                            <form className={classes.form} noValidate>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    style={{ backgroundColor: '#41b4e8', color: "white" }}
                                    className={classes.submit}
                                    onClick={() => {
                                        props.history.push('./users')
                                    }}
                                >
                                    Sign In
            </Button>
                                {/* <Link to="/users">Users</Link> */}
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="#" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Box mt={5}>
                                </Box>
                            </form>
                        </div>
                    </Grid>
                    <Grid item xs={false} sm={4} md={7} className={classes.image} />
                </Grid>
            </main>
            <footer className={classes.footer}>
                <Typography variant="h8" align="center" fontSize={16} fontFamily="Monospace" fontWeight="fontWeightRegular" gutterBottom>
                    Copyright @ 2020 Estuate.All rights reserved
        </Typography>
                {/* <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Something here to give the footer a purpose!
        </Typography> */}
                {/* <Copyright /> */}
            </footer>

        </React.Fragment>
    );
}
export default withRouter(SignIn);