import { useContext, useEffect } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import GameEnvironment from '../components/GameEnviroment';
import { AuthContext } from '../context/AuthContext';
import AuthRouter from './AuthRouter';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

function AppRouter() {
  const { auth, verificarToken, generarPassword } = useContext(AuthContext);

  useEffect(() => {
    verificarToken();
    generarPassword();
  }, [verificarToken, generarPassword]);

  if (auth.checking) {
    return <div />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/game"
          element={
            <PrivateRoute>
              <GameEnvironment />
            </PrivateRoute>
          }
        />
        <Route
          path="/*"
          element={
            <PublicRoute>
              <AuthRouter />
            </PublicRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
