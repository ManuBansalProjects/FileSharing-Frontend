import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';

import * as UserService from '../services/userServices';

const styles = {
  container: {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '24px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
    fontFamily: 'sans-serif',
  },
  heading: {
    marginBottom: '24px',
    fontSize: '22px',
    textAlign: 'center',
    color: '#333',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
  },
  label: {
    marginBottom: '6px',
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#444',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
    boxSizing: 'border-box',
  },
  error: {
    marginTop: '6px',
    color: 'red',
    fontSize: '13px',
  },
  button: {
    width: '100%',
    padding: '10px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};



function ChangePasswordPage() {

    const {token} = useParams();

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required('Old password is required'),
      newPassword: Yup.string().min(6, 'Minimum 6 characters').required('New password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm your new password'),
    }),
    onSubmit: async(values, {resetForm}) => {
        try {
            await UserService.ChangePassword(values)        
            alert('reset successfully!');
            resetForm();
        } catch (error) {
            
        }
    },
  });

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Change Password</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          {/* Old Password */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Old Password</label>
            <input
              type="password"
              name="oldPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.oldPassword}
              style={styles.input}
            />
            {formik.touched.oldPassword && formik.errors.oldPassword && (
              <div style={styles.error}>{formik.errors.oldPassword}</div>
            )}
          </div>

          {/* New Password */}
          <div style={styles.formGroup}>
            <label style={styles.label}>New Password</label>
            <input
              type="password"
              name="newPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              style={styles.input}
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <div style={styles.error}>{formik.errors.newPassword}</div>
            )}
          </div>

          {/* Confirm Password */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              style={styles.input}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div style={styles.error}>{formik.errors.confirmPassword}</div>
            )}
          </div>
            
          <button type="submit" style={styles.button}>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default ChangePasswordPage;
