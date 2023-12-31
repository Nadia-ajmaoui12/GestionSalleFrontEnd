import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import SearchIcon from '@mui/icons-material/Search';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  TextField,
  InputAdornment,
} from '@mui/material';
import { fetchClients } from '../../../store/actions.ts';
import { selectClients } from '../../../store/selectors.ts';
import '../styles/style.css';

const ClientsList = ({ clientsList }: { clientsList: any }) => {
  const dispatch = useDispatch();
  const [filteredClients, setFilteredClients] = useState(clientsList);

  useEffect(
    () => {
      dispatch(fetchClients());
    },
    [fetchClients],
  );

  useEffect(
    () => {
      setFilteredClients(clientsList);
    },
    [clientsList],
  );

  const handleFilter = (firstName: string) => {
    const filtered = clientsList.filter((client: any) =>
      client.firstName.toLowerCase().includes(firstName.toLowerCase()),
    );
    setFilteredClients(filtered);
  };

  const highlightColor = '#D9D9D9';
  return (
    <div>
      <Paper className="PaperStyle">
        <Typography className="PageTitle"> Clients List</Typography>
        <TextField
          className="searchBar"
          type="text"
          placeholder="Filter by First Name"
          onChange={e => handleFilter(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {filteredClients && filteredClients.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow className="TableRow">
                <TableCell className="TableCell">First Name</TableCell>
                <TableCell className="TableCell">Last Name</TableCell>
                <TableCell className="TableCell">Email</TableCell>
                <TableCell className="TableCell">Last Reservation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredClients.map((client: any) => (
                <TableRow
                  style={{
                    backgroundColor: client.lastReservation
                      ? ''
                      : highlightColor,
                  }}
                >
                  <TableCell>{client.firstName}</TableCell>
                  <TableCell>{client.lastName}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>
                    {client.lastReservation
                      ? client.lastReservation.reservationDate
                      : 'NONE'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No reservations available</p>
        )}
      </Paper>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  clientsList: selectClients,
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(ClientsList);
