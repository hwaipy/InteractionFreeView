import React from 'react'
import {
  // CBadge,
  // CDropdown,
  // CDropdownItem,
  // CDropdownMenu,
  // CDropdownToggle,
  // CRow,
  // CCol,
  // CInput,
  // CCard,
  // CCardBody,
  // CForm,
  // CFormGroup,
  // CInputGroup,
  // CInputGroupAppend,
  // CInputGroupText,
  // CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Avatar from '@material-ui/core/Avatar';
import account from './../views/service/Account'
// import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import TextField from '@material-ui/core/TextField';
// import Popper from '@material-ui/core/Popper';
// import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Popover from '@material-ui/core/Popover';
// import Typography from '@material-ui/core/Typography';
// import Container from '@material-ui/core/Container';

function AccountAvatar(props) {
  return <Avatar className={makeStyles({ bg: { background: ({ true: '#8a93a2', false: '#c4c9d0' })[props['signedin']] } })(props).bg} {...props} />;
}

function AccountPopover() {
  // const classes = makeStyles((theme) => ({
  //   typography: { padding: theme.spacing(2) },
  //   paper: { width: 300 },
  // }))();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // eslint-disable-next-line
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl)
  // const id = open ? 'simple-popover' : undefined

  return (
    <div>
      <AccountAvatar signedin={account.signedIn.toString()} aria-controls="customized-menu" aria-haspopup="true" variant="circle" onClick={(event) => setAnchorEl(event.currentTarget)}>
        {account.signedIn ? account.ID.toString().toUpperCase().slice(0, 1) : <CIcon name="cil-user" size="xl" />}
      </AccountAvatar>
      {/* <Popover id={id} open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }} transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
        {account.signedIn ? (
          <Paper className={classes.paper}>
            <List>
              <ListItem>
                <Grid container justify="center">
                  <Typography variant="h6" gutterBottom>{account.ID}</Typography>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container justify="center">
                  <Typography className={classes.typography}>{"One thing"}</Typography>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container justify="center">
                  <Typography className={classes.typography}>{"The other thing"}</Typography>
                </Grid>
              </ListItem>
            </List>
          </Paper>
        ) : (
            <Paper className={classes.paper}>
              <List>
                <ListItem>
                  <TextField id="outlined-username-input" label="Username" type="Username" autoComplete="current-username" defaultValue="" variant="outlined" fullWidth="true" />
                </ListItem>
                <ListItem>
                  <TextField id="outlined-password-input" label="Password" type="password" autoComplete="current-password" variant="outlined" fullWidth="true" />
                </ListItem>
                <ListItem>
                  <Grid container justify="center">
                    <Button variant="outlined">Login</Button>
                  </Grid>
                </ListItem>
              </List>
            </Paper>
          )}
      </Popover> */}
    </div>
  );
}

class AccountHeaderDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { signedIn: account.signedIn };
  }

  componentDidMount() {
    account.on((this.accountChanged).bind(this))
  }

  componentWillUnmount() {
    account.off((this.accountChanged).bind(this))
  }

  accountChanged() {
    this.setState({
      signedIn: account.signedIn,
      accountID: account.ID
    })
  }

  render() {
    return (
      <AccountPopover />
    );
  }
}

export default AccountHeaderDropdown
