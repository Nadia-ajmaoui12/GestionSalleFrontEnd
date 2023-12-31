import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  Typography,
  TextField,
} from '@mui/material';
import {
  fetchReservations,
  updateReservationForManager,
} from '../../../store/actions.ts';
import { selectReservations } from '../../../store/selectors.ts';
import '../styles/style.css';

const ReservationListManager = ({
  reservationList,
}: {
  reservationList: any;
}) => {
  const dispatch = useDispatch();

  const [filterData, setFilterData] = useState('');
  const [list, setList] = useState([]);

  useEffect(
    () => {
      if (filterData === '') {
        setList(reservationList);
      } else {
        const filteredList = reservationList.filter(
          item => item.timeSlot === filterData,
        );

        setList(filteredList);
      }
    },
    [filterData, reservationList],
  );

  useEffect(
    () => {
      dispatch(fetchReservations());
    },
    [fetchReservations],
  );

  const HandleUpdateForManager = (
    reservationId: string,
    reservationStatus: any,
  ) => {
    dispatch(updateReservationForManager(reservationStatus, reservationId));
  };

  return (
    <div>
      <Paper className="PaperStyle">
        <Typography className="PageTitle"> Reservations List</Typography>
        <div className="SearchInput">
          <TextField
            label="Search"
            variant="outlined"
            value={filterData}
            onChange={e => setFilterData(e.target.value)}
          />
        </div>

        {list && list.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow className="TableRow">
                <TableCell className="TableCell">Client Name</TableCell>
                <TableCell className="TableCell">Date</TableCell>
                <TableCell className="TableCell">Time Slot</TableCell>
                <TableCell className="TableCell">Room Ref</TableCell>
                <TableCell className="TableCell">Status</TableCell>
                <TableCell className="TableCell">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((reservation: any) => (
                <TableRow>
                  <TableCell>
                    {reservation.clientId
                      ? reservation.clientId.firstName
                      : 'NONE'}
                  </TableCell>
                  <TableCell>{reservation.reservationDate}</TableCell>
                  <TableCell>{reservation.timeSlot}</TableCell>
                  <TableCell>
                    {reservation.spotId ? reservation.spotId.ref : 'none'}
                  </TableCell>
                  <TableCell>{reservation.status}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        HandleUpdateForManager(reservation.id, 'ACCEPTED');
                      }}
                      disabled={
                        reservation.status === 'CANCELED' ||
                        reservation.status === 'ACCEPTED' ||
                        reservation.status === 'REJECTED'
                      }
                    >
                      accept
                    </Button>
                    <Button
                      onClick={() => {
                        HandleUpdateForManager(reservation.id, 'REJECTED');
                      }}
                      disabled={
                        reservation.status === 'CANCELED' ||
                        reservation.status === 'ACCEPTED' ||
                        reservation.status === 'REJECTED'
                      }
                    >
                      Reject
                    </Button>
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
  reservationList: selectReservations,
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(ReservationListManager);
