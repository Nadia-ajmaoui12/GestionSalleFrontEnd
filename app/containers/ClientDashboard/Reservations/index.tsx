import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Link } from 'react-router-dom';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  Typography,
} from '@mui/material';
import {
  cancelReservationClient,
  fetchReservationsClient,
} from '../../../store/actions.ts';
import { selectReservations } from '../../../store/selectors.ts';
import './styles/style.css';

const ReservationList = ({ reservationList }: { reservationList: any }) => {
  const dispatch = useDispatch();
  const statusColors = {
    PENDING: 'orange',
    CANCELED: 'gray',
    ACCEPTED: 'green',
  };
  useEffect(() => {
    dispatch(fetchReservationsClient());
  }, []);
  const submiCancelReservation = (reservationId: string) => {
    dispatch(cancelReservationClient(reservationId));
  };
  return (
    <div>
      <Paper className="PaperStyle">
        <Typography className="PageTitle"> Reservations List</Typography>
        {reservationList && reservationList.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow className="TableRow">
                <TableCell className="TableCell">Date</TableCell>
                <TableCell className="TableCell">Time Slot</TableCell>
                {/* <TableCell className="TableCell">Spot Ref</TableCell> */}
                <TableCell className="TableCell">Status</TableCell>
                <TableCell className="TableCell">Cancel</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservationList.map((reservation: any) => (
                <TableRow
                  key={reservation.id}
                  style={{
                    color:
                      reservation.status === 'CANCELED' ? 'white' : 'inherit',
                  }}
                >
                  <TableCell>{reservation.reservationDate}</TableCell>
                  <TableCell>{reservation.timeSlot}</TableCell>
                  {/* <TableCell>{reservation ? reservation.spotId : "none" }</TableCell> */}

                  <TableCell
                    style={{
                      color: statusColors[reservation.status] || 'inherit',
                    }}
                  >
                    {reservation.status}
                  </TableCell>

                  <TableCell>
                    <Button
                      onClick={() => submiCancelReservation(reservation.id)}
                      disabled={
                        reservation.status === 'CANCELED' ||
                        reservation.status === 'ACCEPTED' ||
                        reservation.status === 'REJECTED'
                      }
                    >
                      Cancel
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
      <div className="AddBtnPosition">
        <Link to="/create/reservation">
          <Button>
            <AddBoxIcon className="AddBtn" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  reservationList: selectReservations,
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(ReservationList);
