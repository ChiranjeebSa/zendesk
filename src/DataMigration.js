import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import { PALETTE } from '@zendeskgarden/react-theming';
// import LinearProgress from '@material-ui/core/LinearProgress';
import { Inline } from '@zendeskgarden/react-loaders'


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = theme => ({
    root: {
        display: 'flex',
        flexGrow: '1',
        padding: '0px'
    },
    demo: {
        width: '100%',
        height: 280,
        maxWidth: 300,
        backgroundColor: theme.palette.background.paper,
    },
    container: {
        display: 'flex',
        flexGrow: 1,
        height: '60vh',
        marginTop: '40px'
    },
    formControl: {
        margin: theme.spacing(3),
    },
    info: {
        // alignSelf: 'flex-end',
        padding: '0px 71px'
    },
    button: {
        position: "relative",
        top: "56px",
        alignSelf: 'flex-end',
        padding: '0px 65px'
    },
    overLay: {

        position: 'fixed',
        display: 'block',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0,0,0,0.7)',
        zIndex: '2',
        cursor: 'pointer'
    },
    text:{
        position: 'absolute',
        top: '50%',
        left: '54%',
        fontSize: '50px',
        color: '#41b4e8',
        transform: 'translate(-50%,-50%)',
        // -ms-transform: translate(-50%,-50%);
      },
    image1: {
        // backgroundImage: `url(${`Estuate_Login.png`})`,
        // backgroundRepeat: 'no-repeat',
        // backgroundColor:
        //     theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        // backgroundSize: 'contain',
        // flexShrink: '0',
        // minHeight: '20%',
        // position: 'relative',
        // top: '380px',
        // width: '135%'
    }

});

class DataMigration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            group: {
                leads: false,
                accounts: false,
                contacts: false,
                oppertunities: false,
                orders: false,
            },
            open: false,
            itemTransferred: '',
            tansferredNames: [],
            showProgress: false
        }
    }

    handleChange = name => event => {
        this.setState({ ...this.state, group: { ...this.state.group, [name]: event.target.checked } });
    };
    authenticate = async () => {
        this.setState({ showProgress: true })
        const accumulator = []
        Object.keys(this.state.group).forEach((i) => {
            if (this.state.group[i] === true) {
                accumulator.push(i)
            }
        });

        const res = await this.handleAsync(accumulator)
        console.log(res);
        const tansferredNames = await res.json();
        this.setState({ tansferredNames: tansferredNames.names })
        const itemTransferred = accumulator[0];
        this.setState({ itemTransferred: itemTransferred, open: true });
        this.setState({ response: res.ok });
        this.setState({showProgress:false})
        // this.state.response ? this.setState({ showProgress: false }) : this.setState({ showProgress: false })
        const x = setTimeout(this.tabChange, 1000);
        this.setState({ intervalId: x });
    };
    tabChange = () => {
        this.state.response ? this.props.changeAuth(true) : this.props.changeAuth(false);

        // this.state.response ? this.props.changeIndex(4) : this.props.changeIndex(2);
    }
    goBack = () => {
        this.state.response ? this.props.changeIndex(0) : this.props.changeIndex(4);
    }
    handleAsync = async (accumulator) => {
        const details = {
            username: localStorage.getItem('username'),
            password: localStorage.getItem('password'),
            client_id: localStorage.getItem('clientId'),
            client_secret: localStorage.getItem('clientSecret'),
            secretToken: localStorage.getItem('secretToken'),
            PAT: localStorage.getItem('Zpat'),
            dataset: accumulator[0]
        }

        let formBody = [];
        // assign all encoded variables in form body
        Object.keys(details).forEach((property) => {
            const encodedKey = encodeURIComponent(property);
            const encodedValue = encodeURIComponent((details)[property]);
            formBody.push(encodedKey + '=' + encodedValue);
        });
        // join &
        formBody = formBody.join('&');

        const url = 'http://mtool-env.hgfrmycmfp.us-west-1.elasticbeanstalk.com/migrate';
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(details)
            })

            const status = res.ok;
            return res;
        }
        catch (e) {
            return e;
        }

    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false })
    };

    componentWillUnmount() {
        clearTimeout(this.state.intervalId)
    }

    // renderRow = (props) => {
    //     console.log(props);
    //     return (
    //         <ListItem button  >
    //             <ListItemText primary={`Item ${props.index + 1}`} />
    //         </ListItem>
    //     )
    // }
    render() {
        const { contacts, accounts, leads, oppertunities, orders } = this.state.group;
        // const error = [gilad, jason, antoine].filter(v => v).length !== 2;
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container className={classes.container}>
                    <Grid item xs={3} className={classes.info}>
                        <div className={classes.image1}></div>
                    </Grid>
                    <Grid item xs={6} component={Paper} elevation={2} square>
                        {this.state.showProgress && <div className={classes.overLay}>
                            <div className={classes.text}>Migrating <Inline size={64} color={PALETTE.blue[500]} /></div>
                        </div>}
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend" style={{ textAlign: "left" }}> <Typography variant="h6" noWrap>
                                {!this.state.response ? 'Choose Objects' : ''}
                            </Typography></FormLabel>
                            {!this.state.response ? <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox checked={leads} onChange={this.handleChange('leads')} value="leads" />}
                                    label="LEADS"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={accounts} onChange={this.handleChange('accounts')} value="accounts" />}
                                    label="ACCOUNTS"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={contacts} onChange={this.handleChange('contacts')} value="contacts" />}
                                    label="CONTACTS"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={oppertunities} onChange={this.handleChange('oppertunities')} value="oppertunities" />}
                                    label="OPPORTUNITIES"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={orders} onChange={this.handleChange('orders')} value="orders" />}
                                    label="ORDERS"
                                />
                                {/* <FormControlLabel
                                control={
                                    <Checkbox checked={antoine} onChange={this.handleChange('antoine')} value="antoine" />
                                }
                                label="Antoine Llorcaaaaaaaaaaaa"
                            /> */}
                            </FormGroup> :
                                <div>
                                    <Typography variant="h6" className={classes.title}>
                                        {`Successfully migrated ${this.state.tansferredNames.length} ${this.state.itemTransferred}`}
                                    </Typography>
                                </div>
                            }
                            {/* <FormHelperText>{!this.state.response ? `Salesforce/Zendesk` : ''}</FormHelperText> */}
                        </FormControl>
                    </Grid>
                    <Grid item xs={3} className={classes.button}>

                        <Button
                            fullWidth
                            variant="contained"
                            style={{ backgroundColor: '#41b4e8', color: "white" }}
                            className={classes.submit}
                            onClick={!this.state.response ? this.authenticate : this.goBack}
                            endIcon={<ArrowForwardIosSharpIcon />}
                        >
                            {!this.state.response ? 'Migrate' : 'Back'}
                        </Button>
                        <Snackbar anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                            open={this.state.open} autoHideDuration={2000} onClose={this.handleClose}>
                            <Alert onClose={this.AuthorizationhandleClose} severity={this.state.response ? "success" : "error"}>
                                {this.state.response === true ?`Successfully migrated`:`Migration Failed`}
                            </Alert>
                        </Snackbar>
                    </Grid>

                </Grid>

            </div>
        );
    }

}
// class ItemRenderer extends React.PureComponent {
//     render() {
//         const item = this.props.data[this.props.index];

//         return (
//             <div style={this.props.style}>
//                 {item}
//             </div>
//         );
//     }
// }
export default withStyles(styles)(DataMigration);