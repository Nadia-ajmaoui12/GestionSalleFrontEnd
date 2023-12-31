const USERS = `/users`;
const LOGIN = `/`;
const REGISTER = `/register`;
const RESERVATIONS = `/reservations`;
const PROFIL = `/profil`;
const CREATE_RESERVATION = `/create/reservation`;
const RESERVATIONS_MANAGER = `/manager/reservations`;
const SPOTS_MANAGER = `/manager/spots`;
const SPOT_FORM_MANAGER = `/manager/spot/form`;
const CLIENTS = `/manager/clients`;
const PublicRoutes = {
  USERS,
  LOGIN,
  REGISTER,
};

const ManagerRoutes = {
  RESERVATIONS_MANAGER,
  SPOTS_MANAGER,
  SPOT_FORM_MANAGER,
  CLIENTS,
  PROFIL,
};

const ClientRoutes = {
  RESERVATIONS,
  CREATE_RESERVATION,
  PROFIL,
};
export { PublicRoutes, ManagerRoutes, ClientRoutes };
