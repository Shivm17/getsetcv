import React, { useState , useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axiosInstance from '../utils/axiosAuth';
import { Input } from './Input';
import { authStyles as styles } from './landingPageStyle';
import { API_PATHS } from '../utils/apiPath';

const Login = ({setCurrentPage}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    setError(null); // Reset error state before making the request
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      });

      if (response.status === 200) {
        const { token } = response.data;
        if (token) {
          localStorage.setItem('token', token); // Store token in localStorage
        }
        updateUser(response.data);
        navigate('/dashboard'); // Redirect to dashboard after successful login
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'An error occurred during login, please try again.');
    }
  }
  return (
    <div className={styles.container}>
      <div>
        <h3 className={styles.title}>Welcome Back</h3>
        <p className={styles.subtitle}>
          Sign in to continue building amazing resumes and CVs
        </p>
       
        <form onSubmit={handleLogin} className={styles.form}>
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
           {error && <div className={styles.error}>{error}</div>}
          <button type="submit" className={styles.submitButton}>Sign In</button>
           <p className={styles.switchText}>
            Don't have an account? 
            <button
              type="button"
              className={styles.switchButton}
              onClick={() => {
                setCurrentPage("signup");
              }}
            >
              Sign Up
            </button>
           </p>
        </form>
      </div>
    </div>
  )
}

export default Login
