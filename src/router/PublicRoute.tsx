import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface Props {
  children: JSX.Element | JSX.Element[];
}

function PublicRoute({ children }: Props) {
  const { auth } = useContext(AuthContext);
  return <div>{auth.logged ? <Navigate to="/game" /> : children}</div>;
}

export default PublicRoute;
