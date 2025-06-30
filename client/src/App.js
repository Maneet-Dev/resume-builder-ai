import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ResumeForm from './components/ResumeForm';
import ResumeList from './components/ResumeList';
import EditResume from './components/EditResume';

function App() {
  return( 
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<ResumeForm />} />
        <Route path="/resumes" element={<ResumeList />} />
        <Route path="/edit/:id" element={<EditResume />} /> 
      </Routes>
    </Router>
  );
}

export default App;