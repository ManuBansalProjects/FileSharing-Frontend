import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import * as AuthService from '../services/authServices';

const validationSchema = Yup.object({
  new_password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirm_password: Yup.string()
    .min(6, 'Confirm Password must be at least 6 characters')
    .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
    .required('Password is required'), 
});

function ResetPassword() {
  const { token } = useParams(); // Assuming you're using a token in the URL
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues : {
            new_password : '',
            confirm_password : ''
        },
        validationSchema,
        onSubmit : async(values, {resetForm})=>{
            try {    
                await AuthService.VerifyLink({...values, token})        
                alert('reset successfully!');
                resetForm();
                navigate('/');
            } catch (error) {
                
            }
        }
    })  
    
  return (
    <div className="auth-container">
      <h2>Set New Password</h2>
       <form onSubmit={ formik.handleSubmit }>
      
            <input
                type="password"
                name="new_password"
                placeholder="New Password"
                value={formik.values.new_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.new_password && formik.errors.new_password && (
            <div className="error">{formik.errors.new_password}</div>
            )}

            <input
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.confirm_password && formik.errors.confirm_password && (
            <div className="error">{formik.errors.confirm_password}</div>
            )}

            <p>
              Already have an account? <Link to="/">Login</Link>
            </p>
            <button type="submit">Reset</button>
        </form>
    </div>
  );
}

export default ResetPassword;
