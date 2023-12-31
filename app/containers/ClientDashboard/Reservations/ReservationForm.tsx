import {
  Button,
  Paper,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Box,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Reservation,
  emptyReservation,
} from '../../../core/models/Reservations.ts';
import {
  createReservation,
  getAvailableSpots,
} from '../../../store/actions.ts';
import { selectAvailableSpots } from '../../../store/selectors.ts';
import { Spot } from '../../../core/models/Spot.ts';

const ReservationForm = ({ spotsList }: { spotsList: any }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [reservationForm, setReservationForm] = useState<Reservation>(
    emptyReservation,
  );
  const [spotInputDisabled, setSpotInputDisabled] = useState(true);
  const timeSlot = ['MORNING', 'AFTERNOON', 'FULLDAY'];
  const spotType = ['DESK', 'PHONEBOOTH', 'MEETINGROOM'];
  const [selectedSalleType, setSelectedSalleType] = useState();

  useEffect(
    () => {
      if (reservationForm.reservationDate) {
        dispatch(
          getAvailableSpots(
            moment(reservationForm.reservationDate).format('YYYY-MM-DD'),
            selectedSalleType,
          ),
        );
        setSpotInputDisabled(false);
      }
    },
    [reservationForm.reservationDate, selectedSalleType],
  );

  const handleOnChange = evt => {
    const { name, value } = evt.target;
    setReservationForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOnChangeType = evt => {
    const { value } = evt.target;
    setSelectedSalleType(value);
  };

  const submitReservation = () => {
    const formattedReservation = {
      ...reservationForm,
      reservationDate: moment(reservationForm.reservationDate).format(
        'YYYY-MM-DD',
      ),
    };

    dispatch(createReservation(formattedReservation));
    setReservationForm(emptyReservation);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" margin={12}>
      <Paper
        elevation={3}
        style={{ padding: '20px', width: '60%', backgroundColor: '#F7F7F7' }}
      >
        <Typography
          style={{
            display: 'flex',
            justifyContent: 'center',
            color: '#000',
            textAlign: 'center',
            fontFamily: 'Inter',
            fontSize: '30px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
          }}
          variant="h5"
          gutterBottom
        >
          Create a New Reservation
        </Typography>

        <Paper
          style={{
            backgroundColor: '#D9D9D9',
            padding: '30px',
            width: '50%',
            margin: 'auto',
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="spotId-label">SpotId</InputLabel>
            <Select
              labelId="spotId-label"
              id="spotId"
              value={reservationForm.spotId}
              onChange={handleOnChange}
              disabled={spotInputDisabled}
              name="spotId"
              style={{ marginTop: '8px', marginBottom: '8px' }}
            >
              {spotsList.map((spot: Spot) => (
                <MenuItem key={spot.id} value={spot.id}>
                  {spot.ref}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            type="date"
            name="reservationDate"
            value={reservationForm.reservationDate}
            onChange={handleOnChange}
            style={{ marginTop: '8px', marginBottom: '8px' }}
          />
          <FormControl fullWidth>
            <InputLabel>TimeSlot</InputLabel>
            <Select
              labelId="spotId-label"
              id="spotId"
              value={reservationForm.timeSlot}
              onChange={handleOnChange}
              name="timeSlot"
              style={{ marginTop: '8px', marginBottom: '8px' }}
            >
              {timeSlot.map((item: string) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              id="spotType"
              value={selectedSalleType}
              onChange={handleOnChangeType}
              name="salleType"
              style={{ marginTop: '8px', marginBottom: '8px' }}
            >
              {spotType.map((item: string) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            onClick={submitReservation}
            style={{
              backgroundColor: '#FF6711',
              height: '51px',
              width: '278px',
              margin: 'auto',
              display: 'block',
            }}
          >
            Submit
          </Button>
        </Paper>
        <Button
          onClick={() => {
            navigate('/reservations');
          }}
          style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}
        >
          <ArrowBackIcon style={{ marginRight: '5px', color: '#FF6711' }} />
          Back to My Reservations
        </Button>
      </Paper>
    </Box>
  );
};

const mapStateToProps = createStructuredSelector({
  spotsList: selectAvailableSpots,
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(ReservationForm);
