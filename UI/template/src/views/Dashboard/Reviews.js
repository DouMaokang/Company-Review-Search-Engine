import React, { useState } from 'react';
import clsx from 'clsx';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles
} from '@material-ui/core';

const data = [
  {
    id: uuid(),
    ref: 'CDD1049',
    amount: 30.5,
    customer: {
      name: "adskjasjd"
    },
    createdAt: 1555016400000,
    status: 'pending'
  },
  {
    id: uuid(),
    ref: 'CDD1048',
    amount: 25.1,
    customer: {
      name: 'Cao Yu'
    },
    createdAt: 1555016400000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: 'CDD1047',
    amount: 10.99,
    customer: {
      name: 'Alexa Richardson'
    },
    createdAt: 1554930000000,
    status: 'refunded'
  },
  {
    id: uuid(),
    ref: 'CDD1046',
    amount: 96.43,
    customer: {
      name: 'Anje Keizer'
    },
    createdAt: 1554757200000,
    status: 'pending'
  },
  {
    id: uuid(),
    ref: 'CDD1045',
    amount: 32.54,
    customer: {
      name: 'Clarke Gillebert'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: 'CDD1044',
    amount: 16.76,
    customer: {
      name: 'Adam Denisov'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: 'CDD1044',
    amount: 16.76,
    customer: {
      name: 'Adam Denisov'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: 'CDD1044',
    amount: 16.76,
    customer: {
      name: 'Adam Denisov'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: 'CDD1044',
    amount: 16.76,
    customer: {
      name: 'Adam Denisov'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: 'CDD1044',
    amount: 16.76,
    customer: {
      name: 'Adam Denisov'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: 'CDD1044',
    amount: 16.76,
    customer: {
      name: 'Adam Denisov'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: 'CDD1044',
    amount: 16.76,
    customer: {
      name: 'Adam Denisov'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: 'CDD1044',
    amount: 16.76,
    customer: {
      name: 'Adam Denisov'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: 'CDD1044',
    amount: 16.76,
    customer: {
      name: 'Adam Denisov'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: 'CDD1044',
    amount: 16.76,
    customer: {
      name: 'Adam Denisov'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  },
];

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end',
  }
}));

const Reviews = ({ className, ...rest }) => {
  const classes = useStyles();
  const [orders] = useState(data);
  const [irrelevant, setIrrelevant] = useState("");

  function onMarkIrrelevant(like, unlike, company, company_query) {
    setIrrelevant(unlike)
      fetch(`http://localhost:8000/feedback/?company=${company}&query=${company_query}`, {
        method: 'POST',
        body: {
          "like": like,
          "unlike": unlike
        }
      })
          .then(response => response.json())
          .then(data => {
            setSearchResults(data.hits.hits)
          })
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
        <Box style={{overflowX: 'auto', maxWidth: "100%"}}>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Company
                </TableCell>
                <TableCell>
                  Review
                </TableCell>
                <TableCell sortDirection="desc">
                  Sentiment
                </TableCell>
                <TableCell size="small">Location</TableCell>
                <TableCell size="small">Status</TableCell>
                <TableCell size="small">Category</TableCell>
                <TableCell size="small">Relevance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                  <TableRow
                      hover
                      key={order.id}
                  >
                    <TableCell>
                      Company
                    </TableCell>
                    <TableCell style={{ minWidth: 400 }}>
                      Review
                    </TableCell>
                    <TableCell>
                      <Chip
                          color="primary"
                          label={order.status}
                          size="small"
                      />
                    </TableCell>

                    <TableCell size="small">Location</TableCell>

                    <TableCell size="small">Status</TableCell>
                    <TableCell size="small">Category</TableCell>
                    <TableCell size="small">
                      <Button onClick={console.log("Clicked")}>
                        Mark as irrelevant
                      </Button>
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>

        </Box>
    </Card>
  );
};

Reviews.propTypes = {
  className: PropTypes.string
};

export default Reviews;
