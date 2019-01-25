import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MenuItems from './MenuItems'
import API from './API'


const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class PersonalInfo extends React.Component  {
  state={
    lines: 1,
    coins: [],
    allcoinsoption: []
  }

  componentDidMount () {
    API.getCoinSymbols()
    .then(json=> this.setState({
      allcoinsoption: json
    },()=>{console.log(this.state)}))
  }

  lines = () =>{
    let lines= this.state.lines
    this.setState({
      lines: lines+1
    })
  }

   createLines = () => {
     let lines =[]
     for( let i = 0; i < this.state.lines; i++){
       lines.push(<MenuItems coinsoptions={this.state.allcoinsoption} key={i} id={i} updateCoins={this.props.updateCoins}/>)
     }
     return lines
   }
  render(){

  return (

    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Add your coins
      </Typography>
      <Fab onClick={this.lines} color="primary" aria-label="Add" size='small' >
        <AddIcon />
      </Fab>
      <br />
      {this.createLines()}
    </React.Fragment>
  );
}
}
export default PersonalInfo;
