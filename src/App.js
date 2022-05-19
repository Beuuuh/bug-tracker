import React, { useState } from 'react';
import RouteSwitch from "./RouteSwitch";
import './App.css';
import { Load, Navbar } from './components';

const App = () => {
  const [user, setUser] = useState({});
  const [onLoad, setOnLoad] = useState(true);
  const [projectData, setProjectData] = useState({});

  return (
    <main className='app'>
      <Navbar />
      { onLoad ? <Load setOnLoad={setOnLoad} setUser={setUser} projectData={projectData}/> : 
      <>
        <RouteSwitch user={user} setUser={setUser} projectData={projectData} setProjectData={setProjectData}/> 
      </>
      }
    </main>
  )
}

export default App;