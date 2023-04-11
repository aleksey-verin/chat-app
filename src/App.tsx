import { useSelector } from 'react-redux';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login';
import Main from './components/Main';
import { selectorUserAuthenticationSlice } from './store/reducers/userAuthenticationSlice';
import { useEffect } from 'react';
import { getMessages } from './store/reducers/messagesSlice';
import { useAppDispatch } from './store/store';
// import { websocketConnect } from './utils/websocket';

const url = 'wss://edu.strada.one/websockets?';

function App() {
  const dispatch = useAppDispatch();
  const { isAuth, userToken } = useSelector(selectorUserAuthenticationSlice);

  // const socket = new WebSocket(`${url}${userToken}`); // слетает deploy

  useEffect(() => {
    if (isAuth && userToken) {
      dispatch(getMessages(userToken));
      // socket.onopen = () => { // слетает deploy
      //   console.log('Connected');
      // };
      // websocketConnect(userToken);
    }
  }, [isAuth]);

  return (
    <div className="wrapper">
      <div className="container">
        <Header />
        <Main />
        <Footer />
        {!isAuth && <Login />}
        {/* <audio id="notification" src="./media/incomeMessage.mp3" muted></audio> */}
      </div>
    </div>
  );
}

export default App;
