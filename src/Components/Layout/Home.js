import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import RestaurantsMap from '../RestaurantsMap';
import RestaurantsList from '../../data/germany-mcDonalds.json';

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
      filterButtonsList: [
        {
          id: 1,
          name: `Subway`,
          isSelected: true
        },
        {
          id: 2,
          name: `KFC`,
          isSelected: true
        },
        {
          id: 3,
          name: `Burger King`,
          isSelected: true
        },
        {
          id: 4,
          name: `McDonald`,
          isSelected: true
        }
      ],
      restaurantsList: RestaurantsList
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.toggleFilterButton(null);
    }, 0);
  }

  toggleFilterButton(index) {
    let list = this.state.filterButtonsList;

    if(index != null) {
      list[index].isSelected = !list[index].isSelected;
    }

    let resList = [];
    list.map(button => {
      if(button.isSelected) {
        let temp = RestaurantsList.filter(restaurant => restaurant.name.includes(button.name));
        resList = resList.concat(temp);
      }
    });

    this.setState({filterButtonsList: list, restaurantsList: resList});
  }

  render() {
    const { classes } = this.props;

    const filterButtons = (this.state.filterButtonsList || []).map((button, index) => (
      <Button type="button" key={button.id} onClick={(e) => this.toggleFilterButton(index)} className={classes.customBtn} variant={`${button.isSelected ? 'contained': 'outlined'}`} size="small" color="primary">
        {button.name}
      </Button>
    ));

    return (
      <div className={classes.content}>
        <Card variant="outlined">
          <CardActionArea>

            <RestaurantsMap list={this.state.restaurantsList}/>

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
            {
              filterButtons
            }
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
