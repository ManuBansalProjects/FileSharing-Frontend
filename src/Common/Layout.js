// components/Layout.js
import Header from '../components/Header'; // your header component
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Header />
      <main style={{ padding: '20px', paddingTop: '80px' }}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
