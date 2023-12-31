interface User {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
}

const emptyUser: User = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  role: 'CLIENT',
};

export { User, emptyUser };
