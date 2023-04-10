// export const websocketConnect = (token: string) => {
//   const url = 'wss://edu.strada.one/websockets?';

//   // if (!token) return null;
//   const socket = new WebSocket(`${url}${token}`);
//   socket.onopen = () => {
//     console.log('Connected');
//   };
//   socket.onmessage = (event) => {
//     const {
//       createdAt,
//       text,
//       user: { email, name }
//     } = JSON.parse(event.data);
//     console.log(name, text);
//     // addMessage(text, email, name, createdAt, 'socket')
//   };
// };

const url = 'wss://edu.strada.one/websockets?';

// export const socket = new WebSocket(`${url}${token}`);
