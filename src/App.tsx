import { useSelector } from 'react-redux';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login';
import Main from './components/Main';
import { selectorUserAuthenticationSlice } from './store/reducers/userAuthenticationSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMessages } from './store/reducers/messagesSlice';
import { useAppDispatch } from './store/store';

function App() {
  const dispatch = useAppDispatch();
  const { isAuth, userToken } = useSelector(selectorUserAuthenticationSlice);

  const url = 'wss://edu.strada.one/websockets?';

  if (!userToken) return;
  const socket = new WebSocket(`${url}${userToken}`);
  socket.onopen = () => {
    console.log('Connected');
  };
  socket.onmessage = (event) => {
    const {
      createdAt,
      text,
      user: { email, name }
    } = JSON.parse(event.data);
    console.log(name, text);
    // addMessage(text, email, name, createdAt, 'socket')
  };
  // useEffect(() => {
  // }, []);

  useEffect(() => {
    if (userToken) {
      dispatch(getMessages(userToken));
    }
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
