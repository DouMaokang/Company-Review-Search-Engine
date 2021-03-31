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
    
    table: {
      minWidth: 200,
      maxWidth: 500
    }
  });

function ReactTable({searchResults}) {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell size="small">Company</TableCell>
              <TableCell align="right" size="small">Review</TableCell>
              <TableCell align="right" size="small">Positivity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {searchResults.map((row) => <TableRow key={row._source.company}>
              <TableCell component="th" scope="row">
                {row._source.company}
              </TableCell>
              <TableCell align="right">{row._source.token}</TableCell>
              <TableCell align="right">"random positivity"</TableCell>
            </TableRow>)}
          </TableBody>
        </Table>
      </TableContainer>
    //   <React.Fragment>
    //     {searchResults.map((row) => console.log(row._source.company))}
    //   </React.Fragment>
    );
  };
  
  export default ReactTable;