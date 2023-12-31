/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { useDispatch } from 'react-redux';
import './styles/style.css';
import { InputAdornment, TextField } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';
import { Login, emptyLogin } from '../../core/models/Login.ts';
import { login } from '../../store/actions.ts';
import LoginImage from '../../utils/images/LoginImage.png';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState<Login>(emptyLogin);

  const handleOnChange = (evt: any) => {
    const { name, value } = evt.target;

    setLoginForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitLogin = (loginObj: any) => {
    dispatch(login(loginObj));
  };

  return (
    <div className="desktop">
      <div className="group-wrapper">
        <div className="group">
          <div className="overlap">
            <div className="div-wrapper">
              <div className="overlap-group-wrapper">
                <div className="overlap-group">
                  <div className="rectangle" />
                  <div className="div" />
                  <div className="overlap-3">
                    <div className="text-wrapper-2">Welcome to our App</div>
                    <p className="p">
                      you can book your rooms easily from home
                    </p>
                  </div>
                  <Link to="/register">
                    <p className="text-wrapper-3">
                      Don’t have an account?SignUp
                    </p>
                  </Link>
                </div>
                <div className="overlap-2">
                  <div
                    className="text-wrapper"
                    onClick={() => submitLogin(loginForm)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        submitLogin(loginForm);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    SignIn
                  </div>
                </div>
              </div>
            </div>
            <img className="img" alt="Rectangle" src={LoginImage} />
            <Grid item xs={12}>
              <TextField
                name="email"
                className="male-user"
                value={loginForm.email}
                onChange={handleOnChange}
                margin="dense"
                variant="standard"
                style={{ width: '550px' }}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlineIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                className="secure"
                value={loginForm.password}
                onChange={handleOnChange}
                style={{ width: '550px' }}
                margin="dense"
                variant="standard"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
