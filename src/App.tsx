import { useSelector } from 'react-redux';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login';
import Main from './components/Main';
import { selectorUserAuthenticationSlice } from './store/reducers/userAuthenticationSlice';
import { useEffect, useState } from 'react';
import { getMessages } from './store/reducers/messagesSlice';
import { useAppDispatch } from './store/store';
// import { websocketConnect } from './utils/websocket';

const url = 'wss://edu.strada.one/websockets?';

function App() {
  const dispatch = useAppDispatch();
  const { isAuth, userToken } = useSelector(selectorUserAuthenticationSlice);

  const [websocket, setWebsocket] = useState(new WebSocket(`${url}${userToken}`));

  // const socket = new WebSocket(`${url}${userToken}`); // слетает deploy

  useEffect(() => {
    if (isAuth && userToken) {
      dispatch(getMessages(userToken));
      // websocketConnect(userToken);
    }
  }, [isAuth]);

  useEffect(() => {
    websocket.onopen = () => {
      // слетает deploy
      console.log('Connected');
      // websocket.send(JSON.stringify({ text: 'тест' }));
    };
  }, []);

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
