import {useFormik} from 'formik';
import * as Yup from 'yup';
import React from 'react';

import * as AuthService from '../services/authServices';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
});

function ForgotPassword() {

    const formik = useFormik({
        initialValues : {
            email : ''
        },
        validationSchema,
        onSubmit : async(values, {resetForm})=>{
            try {
                const response = await AuthService.ForgotPassword(values);
                alert('forgot successfully!');
                resetForm();
            } catch (error) {
                
            }
        }
    })  

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>
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

        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
