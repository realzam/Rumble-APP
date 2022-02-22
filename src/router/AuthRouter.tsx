import { Routes, Route, Navigate } from 'react-router-dom';
import CreateRoom from '../pages/CreateRoom';
import JoinToRoom from '../pages/JoinToRoom';

function AuthRouter() {
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-t-50 p-b-90">
          <Routes>
            <Route path="/" element={<JoinToRoom />} />
            <Route path="crear" element={<CreateRoom />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AuthRouter;
