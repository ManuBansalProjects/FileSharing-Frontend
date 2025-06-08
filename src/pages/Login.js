import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import * as AuthService from '../services/authServices';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

function Login() {

    const navigate = useNavigate();
    
    const formik = useFormik({
        initialValues : {
            email : '',
            password : ''
        },
        validationSchema,
        onSubmit : async(values, {resetForm})=>{
            try {
                const response = await AuthService.Login(values);   
                alert('Login successfully!');
                resetForm();    
                localStorage.setItem('user', JSON.stringify(response?.data?.data))
                navigate('/dashboard')
            } catch (error) {
                alert(error.message || 'something went wrong')
            }
        }
    })  

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={ formik.handleSubmit }>
         <input
          type="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="error">{formik.errors.email}</div>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="error">{formik.errors.password}</div>
        )}

        <div style={{ textAlign: 'right', marginBottom: '10px' }}>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
