import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import RemoveIcon from '@material-ui/icons/Remove';
import API from '../API'


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

class Form extends React.Component{

  state={
    apikey:'',
    apisecret:'',
  }


  handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value,
      });
    };

  handleSubmit = (e) => {
    e.preventDefault()
    API.apiKeys2(this.state)
    this.props.handleSubmit()
  }

  render(){
    const { classes } = this.props;

    return(
      <div className="edit2">
      <form onSubmit={(e)=>{this.handleSubmit(e)}} className={classes.container} noValidate autoComplete="off">
        <TextField
        className="NoteField"
          id="outlined-full-width"
          label="API key"
          name="apikey"
          style={{ margin: 8 }}
          placeholder="Write down your API key"
          onChange={(e)=>{this.handleChange(e)}}
          helperText="Write down your API key"
          fullWidth
          value={this.state.note}
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
        className="NoteField"
          id="outlined-full-width"
          label="API secret"
          name="apisecret"
          style={{ margin: 8 }}
          placeholder="Write down your API secret."
          onChange={(e)=>{this.handleChange(e)}}
          helperText="Write down your API secret"
          fullWidth
          value={this.state.note}
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button type="submit" value="submit" variant="contained" color="primary" id="submitButton" className={classes.button}>
            Submit
        </Button>
      </form>
      </div>
    )
  }
}


Form.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Form)
