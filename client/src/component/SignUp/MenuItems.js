import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/FormControl';
import Select from 'react-select';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from  'react-autocomplete';
import { getCryptos, matchCryptos } from '../data';

const options= getCryptos()
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',
    padding: 20,
  }),
    }



class MenuItems extends React.Component {
  state={
    id: this.props.id,
    coin: '',
    amount: '',
    price_per_unit: ''
  }

  componentDidMount() {
    getCryptos()
  }
  handleChange = async event  => {
    await this.setState({ [event.target.name]: event.target.value });
    this.props.updateCoins(this.state)
  }

  handleChangeSelect = async event  => {
    console.log(event)
    await this.setState({ coin: event.label });
    this.props.updateCoins(this.state)
  }
  render(){
    return(<>
      <Grid container spacing={32}>
      <Grid item xs={8} sm={3}>

      <InputLabel htmlFor="coin">Coin Type</InputLabel>
      <Select
          name="coin"
          value={this.state.coin}
          onChange={this.handleChangeSelect}
          options={this.props.coinsoptions}
          styles={customStyles}

        />
      </Grid>
      <Grid item xs={8} sm={3}>
      <InputLabel htmlFor="coin">Coin Type</InputLabel>

        <TextField value={this.state.coin}  />
      </Grid>
        <Grid item xs={8} sm={3}>
          <TextField onChange={this.handleChange} name="amount" required id="coinAmount" label="Coin Amount" fullWidth />
        </Grid>

        <Grid item xs={8} sm={3}>
          <TextField onChange={this.handleChange} name="price_per_unit" required id="coinPrice" label="Price per unit (EUR)" fullWidth />
        </Grid>
      </Grid>

      </>
    )
  }
}
export default MenuItems
