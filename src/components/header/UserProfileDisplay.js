import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    position: "absolute",
    top: '65px',
    right: '10px',
    width: 300,
  },
  actionArea: {
    pointerEvents: 'none',
  },
  media: {
    height: 300,
  },
  editeLink: {
      marginLeft: 20,
      marginBottom: 5,
  }
});

export default function UserProfileDisplay(props) {
  const classes = useStyles();
  const {src} = props;

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.actionArea}>
        <CardMedia
          className={classes.media}
          image={src.avatarUrl}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {src.firstName + ' ' + src.lastName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
              <span>{`E-Mail: ${src.email}`}</span><br/>
              <span>{`Birth date: ${src.birthDate}`}</span><br/>
              <span>{`Sex: ${src.sex}`}</span><br/>
              <span>{`Java Scritp experience ${src.jsExperience} months`}</span><br/>
              <span>{`React JS experience ${src.reactExperience} months`}</span><br/>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to="/userprofile/edit_profile" className={classes.editeLink} onClick={props.onClose}>
          Edite profile
        </Link>
        <Button size="small" color="primary" onClick={props.onClose}>
          Close
        </Button>
      </CardActions>
    </Card>
  );
}