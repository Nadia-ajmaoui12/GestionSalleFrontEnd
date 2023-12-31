import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
} from '@mui/material';
import '../styles/style.css';
import './styles/style.css';
import { useDispatch } from 'react-redux';
import { Spot, emptySpot } from '../../../core/models/Spot.ts';
import { createSpot } from '../../../store/actions.ts';

const SpotForm = () => {
  const dispatch = useDispatch();

  const [spotForm, setSpotForm] = useState<Spot>(emptySpot);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setSpotForm(prevSpotForm => ({
      ...prevSpotForm,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(createSpot(spotForm));
  };

  return (
    <Paper className="PaperStyle" elevation={2}>
      <Typography variant="h4" align="center" gutterBottom>
        Create New Room
      </Typography>
      <div className="FormStyle">
        <TextField
          label="Level"
          variant="outlined"
          margin="normal"
          fullWidth
          name="level"
          value={spotForm.level}
          onChange={handleInputChange}
        />
        <TextField
          label="Ref"
          variant="outlined"
          margin="normal"
          fullWidth
          name="ref"
          value={spotForm.ref}
          onChange={handleInputChange}
        />
        <TextField
          label="Person Number"
          variant="outlined"
          margin="normal"
          fullWidth
          name="personNumber"
          value={spotForm.personNumber}
          onChange={handleInputChange}
        />
        <TextField
          label="Description"
          variant="outlined"
          margin="normal"
          fullWidth
          name="description"
          value={spotForm.description}
          onChange={handleInputChange}
        />
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel htmlFor="Type">Spot Type</InputLabel>
          <Select
            label="Room Type"
            name="type"
            value={spotForm.type}
            onChange={handleInputChange}
          >
            <MenuItem value="DESK">Desk</MenuItem>
            <MenuItem value="PHONEBOOTH">Phone Booth</MenuItem>
            <MenuItem value="MEETINGROOM">Meeting Room</MenuItem>
          </Select>
        </FormControl>
        <Button style={{
          backgroundColor: '#ff6610',
          display: 'flex',
          margin: 'auto',
          width: '400px',
          height: '45px',
          marginTop: '15px',
        }}
          variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </Paper>
  );
};

export default SpotForm;
