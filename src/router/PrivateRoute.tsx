import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface Props {
  children: JSX.Element | JSX.Element[];
}

function PrivateRoute({ children }: Props) {
  const { auth } = useContext(AuthContext);
  return <div>{auth.logged ? children : <Navigate to="/" />}</div>;
}

export default PrivateRoute;
