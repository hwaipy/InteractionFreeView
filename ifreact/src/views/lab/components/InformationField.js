import React from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

function InformationField(props) {
  const inputPropsTextField = {
    style: {
      height: 36,
      padding: '0 14px',
      textAlign: "right",
      color: 'black',
    },
  }
  const styles = {
    textField: {
      marginTop: 3,
      marginBottom: 3,
      marginLeft: 3,
      marginRight: 3,
    },
  }

  function handleChange() { console.log('oc') }

  return (
    <Paper>
      <Grid container spacing={0} alignItems='center' >
        <Grid item>
          <Box fontWeight="fontWeightBold" m={1}>{props.title}</Box>
        </Grid>
        <Grid item style={styles.textField} xs>
          <TextField variant="outlined" inputProps={inputPropsTextField} value={props.value} onChange={handleChange} />
        </Grid>
        {props.tail ? (
          <Grid>
            <Box m={1}>{props.tail}</Box>
          </Grid>
        ) : (<p></p>)}
      </Grid>
    </Paper>
  );
}

  // class InformationField extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = { value: '' };
  //     this.handleChange = this.handleChange.bind(this);
  //     this.handleSubmit = this.handleSubmit.bind(this);
  //   }

  //   handleChange(event) { this.setState({ value: event.target.value }); }
  //   handleSubmit(event) {
  //     alert('提交的名字: ' + this.state.value);
  //     event.preventDefault();
  //   }

  //   setState(props) {
  //     super.setState(props)
  //     console.log('update setateaw in if')
  //   }

  //   render() {
  //     return (
  //       <Paper>
  //         {"~~~" + this.state.value}
  //         {/* <Grid container spacing={0} alignItems='center' >
  //           <Grid item>
  //             <Box fontWeight="fontWeightBold" m={1}>{props.title}</Box>
  //           </Grid>
  //           <Grid item style={styles.textField} xs>
  //             <TextField variant="outlined" inputProps={inputPropsTextField} value={props.value} onChange={handleChange} />
  //           </Grid>
  //           {props.tail ? (
  //             <Grid>
  //               <Box m={1}>{props.tail}</Box>
  //             </Grid>
  //           ) : (<p></p>)}
  //         </Grid> */}
  //       </Paper>
  //     );
  //   }
  // }

export default InformationField