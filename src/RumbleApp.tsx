import AuthProvider from './context/AuthProvider';
import SocketProvider from './context/SocketProvider';
// import TestRoom from './pages/TestRoom';
import AppRouter from './router/AppRouter';
import './styles/styles.scss';

function ChatApp() {
  return (
    <AuthProvider>
      <SocketProvider>
        <AppRouter />
        {/* <TestRoom /> */}
      </SocketProvider>
    </AuthProvider>
  );
}

export default ChatApp;
