import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './context/theme_context';
// import { FilterContext } from './context/filter_contents_contex';
import reportWebVitals from './assets/reportWebVitals';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles.css';
import './assets/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <ThemeProvider>
        {/* <FilterContext> */}
          <App />
        {/* </FilterContext> */}
      </ThemeProvider>
    </React.StrictMode>
  </BrowserRouter>
);

reportWebVitals();
