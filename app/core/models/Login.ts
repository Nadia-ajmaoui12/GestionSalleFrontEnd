interface Login {
  email: string;
  password: string;
}

const emptyLogin: Login = {
  email: '',
  password: '',
};

export { Login, emptyLogin };
