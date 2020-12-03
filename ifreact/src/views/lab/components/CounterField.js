import React from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

function CounterField(props) {
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
    },
  }
  let channelNumStr = props.channel.toString()
  if (channelNumStr.length === 1) channelNumStr = "0" + channelNumStr
  return (
    <Paper>
      <Grid container spacing={0} alignItems='center' justify="center" >
        <Grid item>
        <Box fontWeight="fontWeightBold" m={1}>{'CH ' + channelNumStr}</Box>
        </Grid>
        <Grid item xs={4} style={styles.textField}>
          <TextField disabled variant="outlined" inputProps={inputPropsTextField} value={(props.count || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')} />
        </Grid>
        <Grid>
          <Box m={1}>@</Box>
        </Grid>
        <Grid item xs={3} style={styles.textField}>
          <TextField variant="outlined" inputProps={inputPropsTextField} defaultValue={'0.0'} />
        </Grid>
        <Grid item>
          <Box textAlign="center" m={1}>ns</Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CounterField