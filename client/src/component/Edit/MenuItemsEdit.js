import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import RemoveIcon from '@material-ui/icons/Remove';

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



class MenuItemsEdit extends React.Component {
  state={
    id: this.props.coin.id,
    coin: this.props.coin.coin,
    amount: this.props.coin.amount,
    price_per_unit: this.props.coin.price_per_unit
  }

  componentDidMount() {
    getCryptos()
  }
  handleChange = async event  => {
    await this.setState({ [event.target.name]: event.target.value });
    this.props.changeCoinsArray(this.state)
  }

  handleChangeSelect = async event  => {
    await this.setState({ coin: event.label });
    this.props.changeCoinsArray(this.state)
  }
  render(){
    return(<>
      <Grid container spacing={40}>
      <Grid item xs={3} sm={3}>

      <InputLabel htmlFor="coin">Coin </InputLabel>
      <Select
          name="coin"
          value={this.state.coin}
          onChange={this.handleChangeSelect}
          options={this.props.coinsoptions}
          styles={customStyles}

        />
      </Grid>
      <Grid item xs={2} sm={2}>
      <InputLabel htmlFor="coin"></InputLabel>

        <TextField value={this.state.coin}  />
      </Grid>
        <Grid item xs={2} sm={2}>
          <TextField onChange={this.handleChange} value={this.state.amount} name="amount" required id="coinAmount" label="Amount" fullWidth />
        </Grid>

        <Grid item xs={2} sm={2}>
          <TextField onChange={this.handleChange} name="price_per_unit" value={this.state.price_per_unit} required id="coinPrice" label="price (EUR)" fullWidth />
        </Grid>
        <Grid item xs={2} sm={2}>
          <Fab onClick={()=>{this.props.removeEditLine(this.props.coin.coin)}} color="primary" aria-label="Add" size='small' >
            <RemoveIcon />
          </Fab>
        </Grid>
      </Grid>

      </>
    )
  }
}
export default MenuItemsEdit
