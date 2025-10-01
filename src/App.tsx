import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import UploadDocument from './pages/UploadDocument/UploadDocument';
import NavBar from './components/NavBar/NavBar';
// import About from './pages/StackTasks';
// import NotFound from './pages/DecryptionFile';


const App: React.FC = () => {
  return (
    <div className="App">
      <NavBar />
      <main style={{ padding: '0 16px' }}>
      <Routes>
        <Route path="/" element={<UploadDocument />} />
        {/* <Route path="/stackTasks" element={<StackTasks />} /> */}
        {/* <Route path="/decryptionFile" element={<DecryptionFile  />} /> */}
      </Routes>
    </main>
    </div>
  )
}


export default App