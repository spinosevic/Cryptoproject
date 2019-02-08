import React from 'react';
import { Link } from 'react-router-dom'
import PersonalPageCss from './PersonalPage.css'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

function MediaCard(props) {
  const { classes } = props;
  return (
    <Card className={`${classes.card} newsCard`}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.singlenews.urlToImage}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.singlenews.title}
          </Typography>
          <Typography component="p">
            {props.singlenews.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions id="read_more">
        <a className={'read_more_btn_wrapper'} style={{ textDecoration: 'none' }} href={props.singlenews.url}>
          <Button size="small" color="primary">
            Read More
          </Button>
        </a>
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);
