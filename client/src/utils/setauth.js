
import api from "./api";


export const setauth = (token) => {
    if (token) {
      api.defaults.headers.common['X-Authorization'] = token;
      localStorage.setItem('token', token);
    } else {
      delete api.defaults.headers.common['X-Authorization'];
      localStorage.removeItem('token');
    }
  };  