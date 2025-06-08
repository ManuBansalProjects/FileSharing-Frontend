import React from 'react';
import { Link } from 'react-router-dom';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import * as AuthService from '../services/authServices';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Too short')
    .max(50, 'Too long')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

function Register() {

  const formik = useFormik({
    initialValues : {
        name : '',
        email : '',
        password : ''
    },
    validationSchema,
    onSubmit : async(values, {resetForm})=>{
        try {
            await AuthService.Register(values);
            alert('Registered successfully!');
            resetForm();   
        } catch (error) {
            alert(error.message || 'Something went wrong');
        }
    }
  })  
  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="error">{formik.errors.name}</div>
        )}

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

        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Register;
