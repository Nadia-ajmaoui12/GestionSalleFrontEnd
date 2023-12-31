import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { register } from '../../store/actions.ts';
import './styles/style.css';
import LoginImage from '../../utils/images/LoginImage.png';
import { User, emptyUser } from '../../core/models/User.ts';

const Register = () => {
  const dispatch = useDispatch();
  const [registerForm, setRegisterForm] = useState<User>(emptyUser);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [, setPasswordError] = useState('');

  const handleOnChange = evt => {
    const { name, value } = evt.target;

    setRegisterForm(prevState => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'password') {
      setPasswordError(value !== confirmPass ? 'Passwords do not match' : '');
    }

    if (name === 'confirmPassword') {
      setConfirmPassword(value);
      setPasswordError(
        registerForm.password !== value ? 'Passwords do not match' : '',
      );
    }
  };

  const { confirmPassword: confirmPass, ...rest } = registerForm;

  const submitRegister = (registerObj: any) => {
    dispatch(register(registerObj));
  };

  return (
    <div className="desktop">
      <div className="group-wrapper">
        <div className="group">
          <div className="overlap">
            <div className="group-2">
              <div className="overlap-group-wrapper">
                <div className="overlap-group">
                  <div className="overlap-4">
                    <div className="group-3">
                      <TextField
                        name="email"
                        className="custom-input"
                        label="Email"
                        value={rest.email}
                        onChange={handleOnChange}
                        variant="outlined"
                        margin="dense"
                        sx={{ backgroundColor: '#fff' }}
                        fullWidth
                      />
                      <TextField
                        name="firstName"
                        className="custom-input"
                        label="FistName"
                        value={rest.firstName}
                        onChange={handleOnChange}
                        variant="outlined"
                        margin="dense"
                        sx={{ backgroundColor: '#fff' }}
                        fullWidth
                      />
                      <TextField
                        name="lastName"
                        className="custom-input"
                        label="Last Name"
                        value={rest.lastName}
                        onChange={handleOnChange}
                        variant="outlined"
                        margin="dense"
                        sx={{ backgroundColor: '#fff' }}
                        fullWidth
                      />

                      <TextField
                        name="password"
                        className="custom-input"
                        label="Password"
                        value={rest.password}
                        onChange={handleOnChange}
                        variant="outlined"
                        margin="dense"
                        sx={{ backgroundColor: '#fff' }}
                        fullWidth
                      />
                      <TextField
                        name="confirmPassword"
                        className="custom-input"
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={handleOnChange}
                        variant="outlined"
                        margin="dense"
                        sx={{ backgroundColor: '#fff' }}
                        fullWidth
                      />
                      <p style={{ color: "#ff6610", marginTop: "5px" }}>
                        Already have an account? <Link to="/" style={{ color: "#ff6610" }}>SignIn</Link>
                      </p>
                    </div>
                  </div>
                  <div
                    className="overlap-8"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      className="custom-button"
                      onClick={() => submitRegister(rest)}
                    >
                      <p style={{ color: '#ffffff' }}>SignUp</p>
                    </Button>
                  </div>
                  <div className="overlap-3">
                    <div className="text-wrapper-2">Create your account</div>
                    <p className="p">
                      you can book your rooms easily from home
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <img className="img" alt="Rectangle" src={LoginImage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
