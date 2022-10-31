import React from 'react';
import style from './style';
import { Grid, Typography } from '@mui/material';

const NotFound = () => {
  const classes = style();
  return (
    <Grid className={classes.commonRoot}>
      <Grid container paddingTop={10} paddingBottom={10}>
        <Grid item sm={12} md={6} paddingLeft={2}>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            className={classes.ownBoss}
          >
            404: Page Not Found
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NotFound;
