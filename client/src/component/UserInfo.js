import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function UserInfo(props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        User info
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="first_name"
            label="First name"
            fullWidth
            autoComplete="fname"
            onChange={props.handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="last_name"
            label="Last name"
            fullWidth
            autoComplete="lname"
            onChange={props.handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="username"
            name="username"
            label="Username"
            fullWidth
            autoComplete="username"
            onChange={props.handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="email"
            fullWidth
            autoComplete="email"
            onChange={props.handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="password"
            name="password"
            label="password"
            type="password"
            fullWidth
            autoComplete="password"
            onChange={props.handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="password_confirmation"
            name="password_confirmation"
            label="password confirmation"
            type="password"
            fullWidth
            autoComplete="password_confirmation"
            onChange={props.handleChange}
          />
        </Grid>
        <Grid item xs={12}>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default UserInfo;
