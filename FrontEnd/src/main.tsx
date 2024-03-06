// import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

const myelement = (
  <body>
    <tr>
      <th align='center'>PRJobs</th>
    </tr>
    <tr>
      <td>Welcome to PRJobs, the most trustworthy app to find and post jobs from around the island Puerto Rico!</td>
    </tr>
    <td align='center'>
      <img src="PRJobs_LOGO.png" alt="Logo" width="400" height="345"></img></td>
  </body>
);

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(myelement);
