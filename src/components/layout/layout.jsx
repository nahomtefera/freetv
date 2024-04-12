import React from 'react';
import PermanentDrawerLeft from '../sidebar/sidebar'; // Import your Sidebar component

const Layout = ({ children }) => {
  return (
    <div className='uk-dark'>
      <PermanentDrawerLeft />
    </div>
  );
};

export default Layout;