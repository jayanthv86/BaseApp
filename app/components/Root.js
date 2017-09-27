import React from 'react';
import Navbar from './Navbar';


const Root = ({ children }) => (
  <div>
     <Navbar />
  <div id="main" className="container-fluid">
   { children }
   </div>
   </div>
);

export default Root;
