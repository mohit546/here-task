import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    backgroundColor: 'unset',
    color: 'unset'
  },
  footer: {
    backgroundColor: '#3f51b5',
    color: '#ffffff',
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0
  }
});

function Footer(props) {
  const { classes } = props;

  return (
    <footer className={classes.footer}>
      <Paper className={classes.root} elevation={3}>
        <Typography variant="h5" component="h3">
          HERE APP
        </Typography>
        <Typography component="p">
          Created By M@h!t
        </Typography>
      </Paper>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
