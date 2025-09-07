import React, { useContext, useState } from 'react'
import { authStyles as styles } from './landingPageStyle'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axiosInstance from '../utils/axiosAuth';
import { validateEmail } from '../utils/helper';
import { Input } from './Input';
import { API_PATHS } from '../utils/apiPath';


const SignUp = (props) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleSignup =  async (e) => { 
    e.preventDefault();
    if(!fullName){
      setError('FullName is required');
      return
    }

    if(!password){
      setError('Password is required');
      return
    }

    if(!validateEmail(email)){
      setError('Please enter a valid email address');
      return
    }

    setError(null); // Reset error state before making the request
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
       name: fullName,
        email:email,
        password :password
      });
      
      if (response.status === 201) {
        const {token} = response.data
        if(token) {
          localStorage.setItem('token', token); // Store token in localStorage
        }
        updateUser(response.data);
        navigate('/dashboard'); // Redirect to dashboard after successful signup
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.response?.data?.message || 'An error occurred during signup , please try again.');
    }
  }
  return (
    <div className="w-[90vw] md:w-[400px] p-8 bg-gradient-to-br from-white to-rose-50 rounded-3xl border border-rose-100 shadow-2xl overflow-hidden">
       <div className={styles.headerWrapper}> 
         <h3 className={styles.signupTitle}>
           Create Account
         </h3>
         <p className={styles.signupSubtitle}>
          Join us to build your resume and get hired faster!
         </p>
       </div>
       {/* Sign Up Form */}
       <form action="" onSubmit={handleSignup} className={styles.form}>
          <Input value={fullName} 
          onChange={({target})=> setFullName(target.value)} label="Full Name" 
          placeholder="Enter your full name" />

          <Input value={email} 
          onChange={({target})=> setEmail(target.value)} 
          label="Email" 
          placeholder="Enter your email address" 
          type="email" />

          <Input value={password} 
          onChange={({target})=> setPassword(target.value)} label="Password" 
          placeholder="Enter your password" 
          type="password" />

          {error && <div className={styles.errorMessage}>{error}</div>}
          <button type='submit ' className={styles.signupSubmit}>
            Create Account
          </button>

          {/*Footer */}
          <p className={styles.switchText}>
            Already have an account? 
            <button type='button' className={styles.signupSwitchButton} 
            onClick={()=> {
              props.setCurrentPage("login");
              }}
            >Sign In</button>
          </p>
       </form>
    </div>
  )
}

export default SignUp
