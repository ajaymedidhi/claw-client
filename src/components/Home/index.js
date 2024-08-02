import React from 'react';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import './index.css';
import Events from '../Events';

const Home = () => {
  return (
    <div className="home">
      <Navbar/>
      <div className="main-content">
        <Sidebar />
        <div className="content">
          <h1>Home</h1>
          <p>Welcome to the Event Manager Application.</p> 
          <Events/>
        </div>
      </div>
    </div>
  );
};

export default Home;
