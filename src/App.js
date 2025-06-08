import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import VerifyUser from './pages/VerifyUser';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import UploadFile from './pages/UplaodFile';
import Profile from './pages/Profile';
import ChangePasswordPage from './pages/ChangePassword';
import ViewFile from './pages/ViewFile';
import PrivateRoute from './util/PrivateRoute';
import PublicRoute from './util/PublicRoute';
import Layout from './Common/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <PublicRoute children = { <Login />} />} />
        <Route path="/register" element={ <PublicRoute children = {  <Register />} />} />
        <Route path="/verify-user/:token" element={ <PublicRoute children = {<VerifyUser />} />} />
        <Route path="/forgot-password" element={ <PublicRoute children = { <ForgotPassword />} />} />
        <Route path="/reset-password/:token" element={ <PublicRoute children = {  <ResetPassword />} />} />

        <Route element={ <PrivateRoute> <Layout/> </PrivateRoute>  }>
          <Route path="/dashboard" element={ <PrivateRoute children = {<Dashboard/>} /> } />
          <Route path="/upload-file" element={ <PrivateRoute children = { <UploadFile />} />} />
          <Route path="/view-file/:fileId" element={ <PrivateRoute children = {  <ViewFile />} />} />
          <Route path="/profile" element={ <PrivateRoute children = {  <Profile />} />} />
          <Route path="/change-password" element={ <PrivateRoute children = {  <ChangePasswordPage/> } />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
