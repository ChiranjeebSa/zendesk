import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
// import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import ZendeskLogo from './assets/Zendesk_Logo.png';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = theme => ({

    root: {
        // display: 'flex',
        // flexGrow: '1',

    },
    container: {
        display: 'flex',
        flexGrow: 1,
        height: '60vh',
        marginTop: '40px'
    },
    form: {
        padding: "9px 35px"
    },
    filed: {
        height: 'inherit'
    },
    info: {
        //alignSelf: 'flex-end',
        padding: '0px 71px'
    },
    button: {
        //  alignSelf: 'flex-end',
        padding: '0px 65px'
    },
    image: {
        backgroundImage: `url(${ZendeskLogo})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'contain',
        flexShrink: '0',
        minHeight: '100%',
        position: "relative",
        bottom: '38px',
        width: '107%'
    },
    primaryProgress: {
        backgroundColor: 'white',
        borderRadius: '4px 4px 0px 0px' ,
        /* width: 62px; */
        height: '4px'
    },
    barColor: {
        backgroundColor: "#41b4e8"
    },
    image1: {
        // backgroundImage: 'url(Estuate_Login.png)',
        // backgroundRepeat: 'no-repeat',
        // backgroundColor:
        //     theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        // backgroundSize: 'contain',
        // flexShrink: '0',
        // minHeight: '20%',
        // position: 'relative',
        // top: '364px',
        // width: '135%'
    }

})

class ZendeskProfile extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            acessToken: '',
            errorMessage: "",
            response: false,
            open: false,
            intervalId: '',
            index: this.props.value,
            showProgress:false
        }
    }
    // handleClick = () => {
    //     this.setState({ open: true })
    // };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false })
    };
    handleChange = (event) => {
        const { name } = event.target;
        this.setState({ [name]: event.target.value })
    }
    authenticate = async (event) => {
        this.setState({showProgress:true})
        const res = await this.handleAsync();
        this.setState({ response: res });
        this.state.response===true?this.setState({showProgress:false}):this.setState({showProgress:false})
        const x = setTimeout(this.tabChange, 1500);
        this.setState({ intervalId: x });
        this.setState({ open: true });
    }
    handleAsync = async () => {
        const pat = '5b74ef3f3efca6bbf03017e285847737cb979d12b2875b6f0fe74af5ec8ae626';
        localStorage.setItem('Zpat',pat);
        const URL = 'https://api.getbase.com/v2/accounts/self';
        const myHeaders = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.acessToken,
        });
        try {
            const res = await fetch(URL,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + this.state.acessToken,
                    }
                });
            const status = res.ok

            return status;
        }
        catch (e) {
            return e;

        }
    }
    tabChange = () => {
        this.state.response===true ? this.props.changeAuth(true) : this.props.changeAuth(false);
        this.state.response===true ? this.props.changeIndex(4) : this.props.changeIndex(2);
    }
    componentWillUnmount() {
         clearTimeout(this.state.intervalId)
        this.setState({response:false})
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid container className={classes.container}>
                    <Grid item xs={3} className={classes.info}>
                        <div className={classes.image1}></div>
                    </Grid>
                    <Grid item xs={6} component={Paper} elevation={2} square className={classes.field}>
                    {this.state.showProgress&&<LinearProgress 
                    classes={{
                        colorPrimary: classes.primaryProgress,
                        barColorPrimary: classes.barColor

                    }} />}
                        <form className={classes.form} >
                        <FormLabel component="legend"> <Typography variant="h6" noWrap>
                                Connect to Zendesk
          </Typography></FormLabel>
                            <TextField
                                // error={this.state.response}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Personal access token"
                                name="acessToken"
                                autoComplete="Personal access token"
                                autoFocus
                                value={this.state.acessToken}
                                onChange={this.handleChange}
                            // onBlur={this.authenticate}
                            />
                        </form>

                    </Grid>
                    <Grid item xs={3} className={classes.button}>
                        <div className={classes.image}></div>
                        <Button
                            //fullWidth
                            variant="contained"
                            style={{backgroundColor:'#41b4e8', color:"white"}}
                            className={classes.submit}
                            onClick={this.authenticate}
                            endIcon={<ArrowForwardIosSharpIcon />}
                        >
                            Next
            </Button>
                        <Snackbar anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                            open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                            <Alert onClose={this.AuthorizationhandleClose} severity={this.state.response ? "success" : "error"}>
                            {this.state.response===true ? 'Connection Established Successfully' : ' Failed to Connect  , Check your Credentials'}
                            </Alert>
                        </Snackbar>
                    </Grid>
                </Grid>

            </div>
        )
    }
}
export default withStyles(styles)(ZendeskProfile);