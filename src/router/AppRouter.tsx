import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import CreateRoom from '../pages/CreateRoom';
import Hangman from '../pages/games/Hangman';
import JoinToRoom from '../pages/JoinToRoom';
import LobbyRoom from '../pages/LobbyRoom';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JoinToRoom />} />
        <Route path="/crear" element={<CreateRoom />} />
        <Route path="/lobby" element={<LobbyRoom />} />
        <Route path="/hangman" element={<Hangman />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
