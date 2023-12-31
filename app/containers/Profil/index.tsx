import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { selectUser } from '../../store/selectors.ts';
import './styles/style.css';
import { updateUser } from '../../store/actions.ts';
// eslint-disable-next-line import/order
import jwt from 'jsonwebtoken';
import accessTokenStorage from '../../services/security/accessTokenStorage.ts';

const Profil = ({ user }: { user: any }) => {
  const dispatch = useDispatch();
  const token = accessTokenStorage.get();
  const decodedToken = jwt.decode(token);
  const userId = decodedToken ? decodedToken.id : 'none';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(
    () => {
      if (user && user.LoginObj) {
        setFormData({
          firstName: user.LoginObj.firstName || '',
          lastName: user.LoginObj.lastName || '',
          email: user.LoginObj.email || '',
          password: user.LoginObj.password || '',
        });
      }
    },
    [user],
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleUpdateUser = () => {
    const updatedUserObj = {
      ...user.LoginObj,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    };

    if (formData.password) {
      updatedUserObj.password = formData.password;
    }

    dispatch(updateUser(userId, updatedUserObj));
  };

  return (
    <Paper elevation={3} className="Form_Paper">
      <Typography variant="h4" align="center" gutterBottom>
        Update Infos
      </Typography>
      <form>
        <TextField
          label="First Name"
          type="text"
          name="firstName"
          value={formData.firstName}
          fullWidth
          margin="normal"
          onChange={handleInputChange}
        />
        <TextField
          label="Last Name"
          type="text"
          name="lastName"
          value={formData.lastName}
          fullWidth
          margin="normal"
          onChange={handleInputChange}
        />
        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          fullWidth
          margin="normal"
          onChange={handleInputChange}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          fullWidth
          margin="normal"
          onChange={handleInputChange}
        />
        <TextField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          fullWidth
          margin="normal"
          onChange={handleInputChange}
        />
      </form>
      <Button
        onClick={() => {
          handleUpdateUser(formData);
        }}
        type="submit"
        variant="contained"
        color="primary"
        style={{
          backgroundColor: '#ff6610',
          display: 'flex',
          margin: 'auto',
          width: '400px',
          height: '45px',
          marginTop: '15px',
        }}
      >
        Update User
      </Button>
    </Paper>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
});

export default connect(mapStateToProps)(Profil);
