import * as React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
  ClientRoutes,
  ManagerRoutes,
  PublicRoutes,
} from './core/constants/routes.ts';
import AppBarMenu from './containers/Menu/AppBar.tsx';
import LoginPage from './containers/Login/index.tsx';
import ReservationList from './containers/ClientDashboard/Reservations/index.tsx';
import ReservationListManager from './containers/ManagerDashboard/Reservations/ReservationsList.tsx';
import SpotsList from './containers/ManagerDashboard/Spots/SpotsList.tsx';
import SpotForm from './containers/ManagerDashboard/Spots/SpotForm.tsx';
import ClientsList from './containers/ManagerDashboard/Clients/ClientsList.tsx';
import Register from './containers/Register/index.tsx';
import ReservationForm from './containers/ClientDashboard/Reservations/ReservationForm.tsx';
import Profil from './containers/Profil/index.tsx';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('access_token');

  const isLoginRoute = location.pathname === PublicRoutes.LOGIN;
  const isRegisterRoute = location.pathname === PublicRoutes.REGISTER;

  React.useEffect(
    () => {
      const isProtectedRoute =
        !isLoginRoute && location.pathname !== PublicRoutes.REGISTER;

      if (isProtectedRoute && !accessToken) {
        navigate('/');
      }
    },
    [accessToken, isLoginRoute, location.pathname, navigate],
  );

  return (
    <>
      {!isLoginRoute && !isRegisterRoute && <AppBarMenu />}
      <Routes>
        <Route path={PublicRoutes.LOGIN} element={<LoginPage />} />
        <Route path={PublicRoutes.REGISTER} element={<Register />} />
        <Route path={ClientRoutes.RESERVATIONS} element={<ReservationList />} />
        <Route
          path={ClientRoutes.CREATE_RESERVATION}
          element={<ReservationForm />}
        />
        <Route
          path={ManagerRoutes.RESERVATIONS_MANAGER}
          element={<ReservationListManager />}
        />
        <Route path={ManagerRoutes.PROFIL} element={<Profil />} />
        <Route path={ClientRoutes.PROFIL} element={<Profil />} />
        <Route path={ManagerRoutes.SPOTS_MANAGER} element={<SpotsList />} />
        <Route path={ManagerRoutes.SPOT_FORM_MANAGER} element={<SpotForm />} />
        <Route path={ManagerRoutes.CLIENTS} element={<ClientsList />} />
      </Routes>
    </>
  );
}
