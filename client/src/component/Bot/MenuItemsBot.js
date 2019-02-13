import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import RemoveIcon from '@material-ui/icons/Remove';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/FormControl';
import Select from 'react-select';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from  'react-autocomplete';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { getCryptos, matchCryptos } from '../data';

const styles = theme => ({

  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  }
});

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',
    padding: 20,
  }),
    }



class MenuItemsBot extends React.Component {
  state={
    coin: '',
    middle_value: '',
    oscillation: '',
    ratio:'',
  }


  handleChange = async event  => {
    await this.setState({ [event.target.name]: event.target.value });
  }

  handleChangeSelect = async event  => {
    await this.setState({ coin: event.label });
  }
  render(){
    const { classes } = this.props;

    return(<>
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
        </Typography>
      <Grid container spacing={40}>
      <Grid item xs={3} sm={3}>

      <InputLabel htmlFor="coin">Coin </InputLabel>
      <Select
          name="coin"
          value={this.state.coin}
          onChange={this.handleChangeSelect}
          options={this.props.coins.map(function(e) {
         return  {value:e.Currency, label: e.Currency}})}
          styles={customStyles}

        />
      </Grid>
      <Grid item xs={2} sm={2}>
      <InputLabel htmlFor="coin"></InputLabel>

        <TextField value={this.state.coin}  />
      </Grid>
        <Grid item xs={2} sm={2}>
          <TextField onChange={this.handleChange} value={this.state.amount} name="middle_value" required id="coinAmount" label="Middle Value"  />
        </Grid>

        <Grid item xs={2} sm={2}>
          <TextField onChange={this.handleChange} name="oscillation" value={this.state.price_per_unit} required id="Oscillation" label="Target Sell/Buy"  />
        </Grid>
        <Grid item xs={2} sm={2}>
          <TextField onChange={this.handleChange} name="ratio" value={this.state.price_per_unit} required id="Balance_Ratio" label="Balance Ratio"  />
        </Grid>
      </Grid>
      </React.Fragment>
      <div className={classes.buttons}>

        <Button onClick={()=>{
          this.props.handleSubmit(this.state)
        }}
          variant="contained"
          color="primary"
          className={classes.button}
        >
        Submit
        </Button>
      </div>
      </>
    )
  }
}
MenuItemsBot.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuItemsBot);
