import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { message } from 'antd';
import AppWrapper from '../app/admin/AppWrapper';

// const apiUrl = 'http://localhost:3001';
const apiUrl = 'https://magenta-cuttlefish-slip.cyclic.app';

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
  const [user, setUser] = useState({ user: null, isAuthenticated: false });

  const setAuthToken = (token) => {
    if(token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem('todo-app-token', token);
      setUser({ user: jwtDecode(token), isAuthenticated: true });
      return;
    }
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem('todo-app-token');
  }
  const login = async (username, password) => {
    const payload = { username, password };
    try {
      const response = await axios.post(`${apiUrl}/login`, payload);
      const { token } = response.data;
      setAuthToken(token);
      // message.success(`تم تسجيل الدخول بنجاح`, 2);
      //  message position left-bottom
      message.success({ content: 'تم تسجيل الدخول بنجاح', duration: 2 });
      return response;
    } catch (error) {
      return error;
    }
  }

  const logout = () => {
    setUser({ user: {}, isAuthenticated: false });
    setAuthToken(false);
  }

  const getCurrentUser = () => {
    try {
      const token = localStorage.getItem('todo-app-token');
      return jwtDecode(token);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  useEffect(() => {
    const userLoggedIn = getCurrentUser();
    if(userLoggedIn) {
      const token = localStorage.getItem('todo-app-token');
      setAuthToken(token)
    }
  }, [])


  return (
    <AuthContext.Provider value={{user, login, logout, apiUrl}}>
      <AppWrapper />
    </AuthContext.Provider>
  )
}