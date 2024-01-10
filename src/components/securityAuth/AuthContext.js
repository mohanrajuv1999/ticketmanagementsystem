import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtAuthprovider } from './jwtAuthprovider';
import { apiCall } from './jwtAuthprovider';


export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {

  const [isAuthenticated, setAuthenticated] = useState(false)

  const [token, setToken] = useState(null);

  const [role, setRole] = useState();

  const [usernamelog, setUser] = useState('');


  useEffect(() =>
    Verify(), [])
  const navigate = useNavigate();
  async function login(username, password) {
    const response = await jwtAuthprovider(username, password)
    //setToken(response)
    console.log(response)
    localStorage.setItem('response', JSON.stringify(response))
    if (response.status === 200) {
      const jtoken = 'Bearer ' + response.data.tokenType
      setUser(username)
      localStorage.setItem('user', username)
      localStorage.setItem('token', jtoken)
      setAuthenticated(true)
      localStorage.setItem('role', (response.data.role))
      console.log('User Role:' + response.data.role)
      setRole(JSON.stringify(localStorage.getItem('role')))


      console.log(jtoken)
      setToken(jtoken)
      Verify()
      return true;
    }
    else {
      logout();
      return false
    }
    // catch(erorr)  {
    //   logout()
    //   return false
    // }

  }
  function Verify() {
    if (localStorage.getItem('response') != null) {
      setAuthenticated(true)
      setRole(localStorage.getItem('role'))
      console.log(role);
      setUser(localStorage.getItem('user'))
      apiCall.interceptors.request.use(
        (config) => {
          console.log("token adding")
          config.headers.Authorization = localStorage.getItem('token')
          return config
        }
      )
    }
  }

  function role_admin() {
    if (role === 'ADMIN') {
      return true;
    }
  }
  function role_user() {
    if (role === 'USER') {
      return true;
    }
  }
  function role_lead() {
    if (role === 'LEAD') {
      return true;
    }
  }
  function logout() {

    setAuthenticated(false)
    localStorage.removeItem('response')
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('user')
    navigate('/login')

    window.location.reload(true)

  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, Verify, token, role_admin, role_lead, role_user, logout,usernamelog }}>
      {children}
    </AuthContext.Provider>
  )
}

