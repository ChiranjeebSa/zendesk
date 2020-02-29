import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
// import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { green } from '@material-ui/core/colors';
// import PersonPinIcon from '@material-ui/icons/PersonPin';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { withStyles, withTheme } from '@material-ui/core/styles';
import ZendeskProfile from './ZendeskLogin';
import SalesForceProfile from './SalesforceLogin';
import DataMigration from './DataMigration';
import Grid from '@material-ui/core/Grid';
import { withRouter } from "react-router";
import logo from './assets/ESTUATE.png';
import TopBar from './assets/TopBar.png';
import Notification from './assets/Notification_Bell.png';
import MigrationHubLogo from './assets/Migration_Hub_logo.png';
import Profile from './assets/Profile.png';


// import Box from '@material-ui/core/Box';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const drawerWidth = 240;

const Styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: '1',
    // width: '700px',
    height: '100vh',
    marginLeft: 'auto',
    marginRight: 'auto'

  },
  title: {
    height: '63px',
    backgroundColor: "#41b4e8",
    fontSize: '41px',
    color: 'white',
    boxShadow:'0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);'

  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor:"white"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // toolbar: theme.mixins.toolbar,
  toolbar: {
    backgroundSize: 'cover',
    // backgroundColor: '#fafafa',
    backgroundImage: `url(${logo})`,
    // backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '63px',
    backgroundColor: '#41b4e8'
    // width: '246px'

  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: '48px',
    padding: '0px'

  },
  button: {
    alignSelf: 'flex-end',
    marginBottom: '60px',
    padding: '0px 77px'
  },
  info: {
    alignSelf: 'flex-end',
    marginBottom: '60px',
    // padding:'0px 77px'
  },
  tabPanel: {
    padding: '0px'
  },
  'tabPanel > div ': {
    padding: '0px'
  },
  footer: {
    position: 'relative',
    top: '68px',
    /* bottom: 0px; */
    left: '0px',
    right: '0px'
  },
  image: {
    backgroundImage: `url(${TopBar})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'contain',
    flexShrink: '0',
    // minHeight: '20%',
    position: 'relative',
    top:'12px',
    // left: '-25px',
    // top: '392px',
    width: '89%',
    height: '40px'

  },
  img3: {
    backgroundImage: `url(${Notification})`,
    backgroundRepeat: 'no-repeat',
    // backgroundColor:
    //   theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'contain',
    flexShrink: '0',
    // minHeight: '20%',
    position: 'relative',
    top:'12px',
    // left: '-25px',
    // top: '392px',
    width: '89%',
    height: '40px'

  },
  img1: {
    backgroundImage: `url(${MigrationHubLogo})`,
    backgroundRepeat: 'no-repeat',
    // backgroundColor:
    //   theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'contain',
    flexShrink: '0',
    // minHeight: '20%',
    position: 'relative',
    left: '-25px',
    // top: '392px',
    width: '89%',
    height: '64px'

  },
  img2: {
    backgroundImage: `url(${Profile})`,
    backgroundRepeat: 'no-repeat',
    // backgroundColor:
    //   theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'contain',
    flexShrink: '0',
    // minHeight: '20%',
    position: 'relative',
    // left: '-25px',
     top: '12px',
    width: '89%',
    height: '40px',

  },
  indicator: {
    backgroundColor: '#41b4e8',
    width: "6px",
    boxShadow:'0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);'
  },
  tabRoot:{
    
    color:'#41b4e8',
    fontSize: '16px',
    boxShadow:'0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);'


  },
  
topbar:{
 height:"64px"
}
});
class ResponsiveDrawer extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      mobileOpen: false,
      value: 0,
      finalValue: "",
      auth: false,
      auth1: false,
      auth2: false,
    }
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  };
  handleChange = (newValue) => {
    console.log(newValue);
    this.setState({ value: newValue })
  };
  handleAuth = (newValue) => {
    this.setState({ auth: newValue })
  };
  handleAuth1 = (newValue) => {
    this.setState({ auth1: newValue })
  };
  handleAuth2 = (newValue) => {
    this.setState({ auth2: newValue })
  };
  getFinalValue = (x) => {
    console.log(x)
  }

  drawer = () => {

    const { classes } = this.props;
    // const theme = useTheme();
    return (
      <div>

        <Typography variant="h6" className={classes.title}>
          ESTUATE
          </Typography>
        <Divider />
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={this.state.value}
          classes={{
            root:classes.tabRoot,
            // class name, e.g. `classes-nesting-root-x`
            indicator: classes.indicator, // class name, e.g. `classes-nesting-label-x`
          }}
          // onChange={this.handleChange} 
          aria-label="Vertical tabs example"
        >
          <Tab label="SalesForce" icon={<CheckCircleOutlineIcon style={{ color: this.state.auth ? green[800] : '#3f51b5' }} />} {...a11yProps(0)} />
          <Divider />
          <Tab label="Zendesk" icon={<CheckCircleOutlineIcon style={{ color: this.state.auth1 ? green[800] : '#3f51b5' }} />} {...a11yProps(1)} />
          <Divider />
          <Tab label="Migrate" icon={<CheckCircleOutlineIcon style={{ color: this.state.auth2 ? green[800] : '#3f51b5' }} />} {...a11yProps(2)} />
          <Divider />
          {/* <br></br> */}
          <Tab label="LogOut" icon={<CheckCircleOutlineIcon style={{ color: this.state.auth2 ? green[500] : '3f51b5' }} onClick={() => { this.props.history.push('/') }} />} {...a11yProps(3)} />
          <Divider />
        </Tabs>
        <List>
          {/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))} */}
        </List>
      </div>
    );
  }

  render() {
    const { container } = this.props;
    const { classes } = this.props;
    console.log('4343434', this.state.value)
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
           
              <Grid container className={classes.topbar}>
                <Grid item xs={10} className={classes.img1}></Grid>
                <Grid item xs={1} className={classes.img3}></Grid>
                <Grid item xs={1} className={classes.img2} ></Grid>
              </Grid>
      
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={this.props.theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {this.drawer()}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {this.drawer()}
            </Drawer>
          </Hidden>
        </nav>
        <Grid container>
          {/* <Grid item xs={3} className={classes.info}>
            <Typography variant="h6" noWrap>
              Powered By Estuate
          </Typography>
          </Grid> */}

          <main className={classes.content}>
            {/* <div className={classes.toolbar} /> */}
            <TabPanel value={this.state.value} index={0} className={classes.tabPanel}>
              <SalesForceProfile value={this.state.value} auth={this.state.auth} changeIndex={(newValue) => this.handleChange(newValue)}
                changeAuth={(newValue) => this.handleAuth(newValue)} />
              {/* <DataMigration/> */}
            </TabPanel>
            <TabPanel value={this.state.value} index={2}>
              <ZendeskProfile value={this.state.value} auth={this.state.auth1} changeAuth={(newValue) => this.handleAuth1(newValue)}
                changeIndex={(newValue) => this.handleChange(newValue)} />
            </TabPanel>
            <TabPanel value={this.state.value} index={4}>
              <DataMigration value={this.state.value} changeIndex={(newValue) => this.handleChange(newValue)} auth={this.state.auth1} changeAuth={(newValue) => this.handleAuth2(newValue)} />
            </TabPanel>
            {/*  */}
            <footer className={classes.footer}>
              <Typography variant="h8" align="center" fontSize={16} fontFamily="Monospace" fontWeight="fontWeightRegular" gutterBottom>
                Copyright @ 2020 Estuate.All rights reserved
        </Typography>
              {/* <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Something here to give the footer a purpose!
        </Typography> */}
              {/* <Copyright /> */}
            </footer>
            {/* </Box> */}
          </main>

          {/* <Grid item xs={3} className={classes.button}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            // onClick={()=>{
            //     props.history.push('./h')
            // }}
            >
              Sign In
            </Button>
          </Grid> */}

        </Grid>

      </div>
    );
  }
}


ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.any,
};

export default withRouter(withTheme(withStyles(Styles)(ResponsiveDrawer)));
