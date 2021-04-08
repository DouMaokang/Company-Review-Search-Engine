import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
    searchBox: {
        // backgroundColor: "white",
        backgroundColor: "white",
        borderRadius: "5px",
        color: "white"
    }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
      <Container>
          <TextField
              className={classes.searchBox}
              fullWidth

              InputProps={{
                  style: {color: "black", weight: "5"},
                  endAdornment: (
                      <InputAdornment position="start">
                          <SvgIcon
                              fontSize="small"
                              color="action"
                          >
                          </SvgIcon>
                      </InputAdornment>
                  )
              }}
              placeholder="Search company"
              variant="outlined"
          />
      </Container>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
