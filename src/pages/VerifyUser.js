import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import * as AuthService from '../services/authServices';

function VerifyUser() {
    const {token} = useParams();
    const navigate = useNavigate();

    const verify=async()=>{
        try {
            const response = await AuthService.VerifyLink({token})
            console.log(response.data);
            localStorage.setItem('user', JSON.stringify(response?.data?.data))
            navigate('/dashboard')
        } catch (error) {
            navigate('/register')
        }
    }

    verify();

  return (
    <div className="auth-container">
      <h2>Verifying User.....</h2>
    </div>
  );
}

export default VerifyUser;
