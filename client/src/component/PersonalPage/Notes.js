import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import RemoveIcon from '@material-ui/icons/Remove';
import API from '../API'


import PersonalPageCss from './PersonalPage.css'

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

class Notes extends React.Component{
  state={
    notes: [],
    note: '',
  }

  componentDidMount(){
    API.getNotes2()
    .then(x=>{
      console.log(x)
      this.setState({
        notes: x
      })
    })
  }

  handleChange = note => event => {
      this.setState({
        [note]: event.target.value,
      });
    };

  handleSubmit = (e) => {
    e.preventDefault()
    let newState=this.state.notes
    newState.push({content: this.state.note})
    this.setState({
      notes: newState
    })
    API.saveNote2(this.state.note)
    .then(x=>{

      this.setState({
        note: ''
      })

    })

  }

  deleteNote= (note) =>{
    let oldState=this.state.notes
    let newState=oldState.filter(x=>x!==note)
    this.setState({
      notes: newState
    })
    API.deleteNote2(note)
  }

  render(){
    const { classes } = this.props;
    return(
      <>
      <div className="Wall">
        <h1>Notes</h1>
        <ul>
          {this.state.notes.map(note=><><li className="list">{`${note.content}`}
            <Fab id="remove" style={{maxWidth: '20px', maxHeight: '20px', minWidth: '20px', minHeight: '20px'}} color="primary" aria-label="Add" size='small' >
              <RemoveIcon   style={{maxWidth: '20px', maxHeight: '20px', minWidth: '20px', minHeight: '20px'}} onClick={()=>this.deleteNote(note)} />
            </Fab></li>

            </>)}
        </ul>
        </div>
        <div className="NoteFieldDiv">
        <form onSubmit={(e)=>{this.handleSubmit(e)}} className={classes.container} noValidate autoComplete="off">

    <TextField
    className="NoteField"
          id="outlined-full-width"
          label="Notes"
          style={{ margin: 8 }}
          placeholder="Write your personal Notes."
          onChange={this.handleChange('note')}
          helperText="Keep Track of ICO here!"
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
        </>

    )
  }


}
Notes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Notes);
