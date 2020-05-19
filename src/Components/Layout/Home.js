import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import RestaurantsMap from '../RestaurantsMap';

const styles = theme => ({
  content: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  customBtn: {
    textTransform: 'none'
  }
});
class Home  extends Component {

  constructor(props) {
    super(props);

    this.state = {
      theme: 'normal.day',
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange(evt) {
    evt.preventDefault();

    var change = evt.target.id;
    console.log('selected ' + change);
    this.setState({
      "theme": change,
    });
  }


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.content}>
        <Card variant="outlined">
          <CardActionArea>
            <RestaurantsMap />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Filters
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Please select below filters as per your convinience
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button className={classes.customBtn} variant="outlined" size="small" color="primary" disableRipple>
              Subway
            </Button>
            <Button className={classes.customBtn} variant="outlined" size="small" color="primary" disableRipple>
              KFC
            </Button>
            <Button className={classes.customBtn} variant="outlined" size="small" color="primary" disableRipple>
              Burger King
            </Button>
            <Button className={classes.customBtn} variant="outlined" size="small" color="primary" disableRipple>
              McDonald's
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }

}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
