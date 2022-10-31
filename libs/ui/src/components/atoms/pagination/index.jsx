import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Grid, Typography } from '@mui/material';
import color from './../../../theme/color';
import style from './style';

const BasicPagination = (props) => {
  const classes = style();
  const { count, page, setPage } = props;

  const handlePageChange = (event, value) => {
    // console.log("paginfnation ===========> page number", value)
    setPage(value);
  };

  return (
    <Grid className={classes.paginationGrid}>
      <Stack spacing={2}>
        <Pagination
          page={parseInt(page)}
          count={count}
          onChange={handlePageChange}
        />
      </Stack>
    </Grid>
  );
};

export default BasicPagination;
