import { useSelector } from 'react-redux';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login';
import Main from './components/Main';
import { selectorUserAuthenticationSlice } from './store/reducers/userAuthenticationSlice';
import { useEffect, useRef, useState } from 'react';
import { getMessages } from './store/reducers/messagesSlice';
import { useAppDispatch } from './store/store';
import { setConnectionLight } from './store/reducers/connectionSlice';
// import { websocketConnect } from './utils/websocket';

const url = 'wss://edu.strada.one/websockets?';

function App() {
  const dispatch = useAppDispatch();
  const { isAuth, userToken } = useSelector(selectorUserAuthenticationSlice);

  const ws = useRef<WebSocket | null>(null);

  const [isConnected, setIsConnected] = useState(false);
  const [socketMessages, setSocketMessages] = useState<iMessage[]>([]);

  useEffect(() => {
    const socket = new WebSocket(`${url}${userToken}`);

    socket.onopen = () => {
      console.log('opened');
      setIsConnected(true);
    };

    socket.onclose = () => {
      console.log('closed');
      setIsConnected(false);
    };

    socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setSocketMessages((socketMessages) => [newMessage, ...socketMessages]);
      console.log('got message', newMessage);
    };

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  const closeConnection = () => {
    if (ws.current) {
      ws.current.close();
    }
  };

  const sendMessage = (text: string) => {
    if (ws.current) {
      ws.current.send(JSON.stringify({ text: text }));
    }
  };

  useEffect(() => {
    if (isAuth && userToken) {
      dispatch(getMessages(userToken));
    }
  }, [isAuth]);

  return (
    <div className="wrapper">
      <div className="container">
        <Header isConnected={isConnected} closeConnection={closeConnection} />
        <Main socketMessages={socketMessages} />
        <Footer sendMessage={sendMessage} />
        {!isAuth && <Login />}
        {/* <audio id="notification" src="./media/incomeMessage.mp3" muted></audio> */}
      </div>
    </div>
  );
}

export default App;
