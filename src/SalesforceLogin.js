import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
// import Box from '@material-ui/core/Box';
// import logo from './images/Estuate _Login.png';
// console.log(logo)
import SalesForce from './assets/Salesforce_Logo.png'


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

const styles = theme => ({

    // root: {
    //     display: 'flex',
    //     flexGrow: '1',
    //     padding: '0px'
    // },
    form: {
        padding: "9px 35px"
    },
    main: {
        marginTop: "34px",
        borderRadius: '4px 4px 0px 0px'
    },

    container: {
        display: 'flex',
        flexGrow: 1,
        height: '60vh',
        marginTop: '40px'
    },
    info: {
        padding: '0px 71px'
    },
    button: {
        // alignSelf: 'flex-end',
        padding: '0px 65px'
    },
    image: {
        backgroundImage: `url(${SalesForce})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'contain',
        flexShrink: '0',
        minHeight: '100%',
        position: "relative",
        bottom: '40px',
        width: '131%'
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
        // top: '392px',
        // width: '135%'
    }



})

class SalesForceProfile extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            clientId: '',
            clientSecret: '',
            userName: '',
            password: '',
            secretToken: '',
            errorMessage: "",
            response: false,
            intervalId: '',
            open: false,
            index: this.props.value,
            showProgress: false,
            Transition: Fade
        }
    }

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
    authenticate = async () => {
        this.setState({ showProgress: true })
        const res = await this.handleAsync();
        this.setState({ response: res.ok });
        console.log(this.state.response, res)
        this.state.response === true ? this.setState({ showProgress: false }) : this.setState({ showProgress: false })
        const x = setTimeout(this.tabChange, 1500);
        this.setState({ intervalId: x });

        this.setState({ open: true })
        this.setState({ Transition: SlideTransition })
    }
    handleAsync = async () => {

        const passwordExt = this.state.password + this.state.secretToken;
        const details = {
            grant_type: 'password',
            client_id: this.state.clientId,
            client_secret: this.state.clientSecret,
            username: this.state.userName,
            password: passwordExt
        };

        // create form body
        let formBody = [];
        // assign all encoded variables in form body
        Object.keys(details).forEach((property) => {
            const encodedKey = encodeURIComponent(property);
            const encodedValue = encodeURIComponent((details)[property]);
            formBody.push(encodedKey + '=' + encodedValue);
        });
        // join &
        formBody = formBody.join('&');
        const url = `https://login.salesforce.com/services/oauth2/token`;
        const formData = new FormData()
        formData.append('grant_type', 'password');
        formData.append('client_id', this.state.clientId);
        formData.append('client_secret', this.state.clientSecret);
        formData.append('username', this.state.userName);
        formData.append('password', passwordExt);


        try {
            const res = await fetch(url, {
                method: 'POST',
                // mode: 'no-cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formBody
            })
            console.log(res.statusText)
            const status = res;

            return status;
        }
        catch (e) {
            console.log(e)
            return e;
        }

    }
    tabChange = () => {
        this.state.response === true ? this.props.changeAuth(true) : this.props.changeAuth(false)
        this.state.response === true ? this.props.changeIndex(2) : this.props.changeIndex(0);
        localStorage.setItem('clientId', this.state.clientId)
        localStorage.setItem('clientSecret', this.state.clientSecret)
        localStorage.setItem('username', this.state.userName)
        localStorage.setItem('password', this.state.password)
        localStorage.setItem('secretToken', this.state.secretToken)
    }
    componentWillUnmount() {
        clearTimeout(this.state.intervalId)
        // this.setState({response:false})
    }
    render() {
        const { classes } = this.props;
        console.log(this.state.response)
        return (
            <React.Fragment>
                <Grid container className={classes.container}>
                    <Grid item xs={3} className={classes.info}>
                        <div className={classes.image1}></div>

                    </Grid>
                    <Grid item xs={6} component={Paper} elevation={2} square className={classes.main}>
                        {this.state.showProgress && <LinearProgress classes={{
                            colorPrimary: classes.primaryProgress,
                            barColorPrimary: classes.barColor

                        }} />}
                        <form className={classes.form} >
                            <FormLabel component="legend"> <Typography variant="h6" noWrap>
                                Connect to Salesforce
          </Typography></FormLabel>
                            <TextField
                                // error={this.state.response}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Client Id"
                                name="clientId"
                                autoComplete="Personal access token"
                                autoFocus
                                value={this.state.acessToken}
                                onChange={this.handleChange}
                                size="small"
                            // onBlur={this.authenticate}
                            />
                            <TextField
                                // error={this.state.response}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Client Secret"
                                name="clientSecret"
                                autoComplete="Personal access token"
                                autoFocus
                                value={this.state.acessToken}
                                onChange={this.handleChange}
                                size="small"
                            // onBlur={this.authenticate}
                            />
                            <TextField
                                // error={this.state.response}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="UserName"
                                name="userName"
                                autoComplete="Personal access token"
                                autoFocus
                                value={this.state.acessToken}
                                onChange={this.handleChange}
                                size="small"
                            // onBlur={this.authenticate}
                            />
                            <TextField
                                // error={this.state.response}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Password"
                                name="password"
                                autoComplete="Personal access token"
                                autoFocus
                                value={this.state.acessToken}
                                onChange={this.handleChange}
                                size="small"
                            // onBlur={this.authenticate}
                            />
                            <TextField
                                // error={this.state.response}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Secret Token"
                                name="secretToken"
                                autoComplete="Personal access token"
                                autoFocus
                                value={this.state.acessToken}
                                onChange={this.handleChange}
                                size="small"
                            // onBlur={this.authenticate}
                            />
                        </form>

                    </Grid>
                    <Grid item xs={3} className={classes.button}>
                        <div className={classes.image}></div>
                        <Button
                            // fullWidth
                            variant="contained"
                            style={{ backgroundColor: '#41b4e8', color: "white" }}
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
                            open={this.state.open} autoHideDuration={10000} onClose={this.handleClose}
                        >
                            <Alert onClose={this.AuthorizationhandleClose} severity={this.state.response === true ? "success" : "error"}>
                                {this.state.response === true ? 'Connection Established Successfully' : ' Failed to Connect  , Check your Credentials'}
                            </Alert>
                        </Snackbar>
                    </Grid>
                </Grid>

            </React.Fragment>
        )
    }
}
export default withStyles(styles)(SalesForceProfile);