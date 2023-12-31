import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
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
import { deleteSpot, fetchSpots, updateSpot } from '../../../store/actions.ts';
import { selectSpots } from '../../../store/selectors.ts';
import '../styles/style.css';
import { Spot } from '../../../core/models/Spot.ts';

const SpotsList = ({ spotsList }: { spotsList: any }) => {
  const dispatch = useDispatch();
  const [editableSpots, setEditableSpots] = useState({});

  useEffect(
    () => {
      dispatch(fetchSpots());
    },
    [fetchSpots],
  );

  const handleDeleteSpot = (spotId: string) => {
    dispatch(deleteSpot(spotId));
  };

  const handleUpdateSpot = (spotId: string) => {
    const updatedSpot = editableSpots[spotId];
    dispatch(updateSpot(updatedSpot, spotId));
    setEditableSpots(prevEditableSpots => ({
      ...prevEditableSpots,
      [spotId]: undefined,
    }));
  };

  const handleCancelUpdateSpot = (spotId: string) => {
    setEditableSpots(prevEditableSpots => ({
      ...prevEditableSpots,
      [spotId]: undefined,
    }));
  };

  const handleEditClick = (spotId: string) => {
    setEditableSpots(prevEditableSpots => ({
      ...prevEditableSpots,
      [spotId]: { ...spotsList.find((spot: Spot) => spot.id === spotId) },
    }));
  };

  const handleInputChange = (spotId: string, field: string, value: string) => {
    setEditableSpots(prevEditableSpots => ({
      ...prevEditableSpots,
      [spotId]: {
        ...(prevEditableSpots[spotId] ||
          spotsList.find((spot: Spot) => spot.id === spotId)),
        [field]: value,
      },
    }));
  };

  return (
    <div>
      <Paper className="PaperStyle">
        <Typography className="PageTitle"> Rooms List</Typography>
        {spotsList && spotsList.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow className="TableRow">
                <TableCell className="TableCell">Room Ref</TableCell>
                <TableCell className="TableCell">Room Level</TableCell>
                <TableCell className="TableCell">Person Number</TableCell>
                <TableCell className="TableCell">Romm Type</TableCell>
                <TableCell className="TableCell">Description</TableCell>
                <TableCell className="TableCell">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {spotsList.map((spot: Spot) => (
                <TableRow key={spot.id}>
                  <TableCell>
                    {editableSpots[spot.id] ? (
                      <TextField
                        value={editableSpots[spot.id].ref}
                        onChange={e =>
                          handleInputChange(spot.id, 'ref', e.target.value)
                        }
                      />
                    ) : (
                      spot.ref
                    )}
                  </TableCell>
                  <TableCell>
                    {editableSpots[spot.id] ? (
                      <TextField
                        value={editableSpots[spot.id].level}
                        onChange={e =>
                          handleInputChange(spot.id, 'level', e.target.value)
                        }
                      />
                    ) : (
                      spot.level
                    )}
                  </TableCell>
                  <TableCell>
                    {editableSpots[spot.id] ? (
                      <TextField
                        value={editableSpots[spot.id].personNumber}
                        onChange={e =>
                          handleInputChange(
                            spot.id,
                            'personNumber',
                            e.target.value,
                          )
                        }
                      />
                    ) : (
                      spot.personNumber
                    )}
                  </TableCell>
                  <TableCell>
                    {editableSpots[spot.id] ? (
                      <TextField
                        value={editableSpots[spot.id].type}
                        onChange={e =>
                          handleInputChange(spot.id, 'type', e.target.value)
                        }
                      />
                    ) : (
                      spot.type
                    )}
                  </TableCell>
                  <TableCell>
                    {editableSpots[spot.id] ? (
                      <TextField
                        value={editableSpots[spot.id].description}
                        onChange={e =>
                          handleInputChange(
                            spot.id,
                            'description',
                            e.target.value,
                          )
                        }
                      />
                    ) : (
                      spot.description
                    )}
                  </TableCell>
                  <TableCell>
                    {editableSpots[spot.id] ? (
                      <>
                        <Button onClick={() => handleUpdateSpot(spot.id)}>
                          <CheckRoundedIcon
                            style={{ color: 'white', backgroundColor: 'green' }}
                          />
                        </Button>
                        <Button onClick={() => handleCancelUpdateSpot(spot.id)}>
                          <ClearRoundedIcon
                            style={{ color: 'white', backgroundColor: 'red' }}
                          />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => handleEditClick(spot.id)}>
                          Update
                        </Button>
                        <Button onClick={() => handleDeleteSpot(spot.id)}>
                          Delete
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No rooms available</p>
        )}
      </Paper>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  spotsList: selectSpots,
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(SpotsList);
