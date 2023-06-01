import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import 'viewerjs/dist/viewer.css';
// import VConsole from 'vconsole';

// const vConsole = new VConsole();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <StrictMode>
  <App />
  // </StrictMode>
);
