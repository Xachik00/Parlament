import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from './components/Admin/context/AuthProvider';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
    
    <AuthProvider>
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
       
    </AuthProvider>
    </BrowserRouter>
  </Provider>
 
   
);

