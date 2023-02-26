import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './app.jsx'

// function Content(props) {
//   console.log(props);
//   const title = props.title;
//   return (
//     <div>
//       <h1>{title}</h1>
//       <div>{props.body} {props.children}</div>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <Content title="Game server hosting" body="Play with your friends today with an easy to use, instantly set up game server.">Sign up for free</Content>
  <App />
);

