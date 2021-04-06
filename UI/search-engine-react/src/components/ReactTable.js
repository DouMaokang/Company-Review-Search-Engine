import React, { useState } from 'react';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

    table: {}
  });

function ReactTable({searchResults}) {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell size="small">Top</TableCell>
              <TableCell size="small">Location</TableCell>
              <TableCell size="small">Company</TableCell>
              <TableCell size="small">Review</TableCell>
              <TableCell size="small">Sentiment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {searchResults.slice(0, 10).map((row, index) => 
              <TableRow key={index}>
              <TableCell align="left">{index+1}</TableCell>
              <TableCell align="left">{row._source.location}</TableCell>
              <TableCell component="th" scope="row">
                {row._source.company}
              </TableCell>
              <TableCell align="left">{row._source.review_raw}</TableCell>
              <TableCell align="left">{row._source.sentiment}</TableCell>
            </TableRow>)}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  export default ReactTable;
