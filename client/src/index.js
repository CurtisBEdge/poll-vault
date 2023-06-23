import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import AxiosClient from './AxiosClient';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AxiosClient/>
  </BrowserRouter>
);
