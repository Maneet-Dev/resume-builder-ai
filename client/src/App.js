import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ResumeForm from './components/ResumeForm';
import ResumeList from './components/ResumeList';
import EditResume from './components/EditResume';
import ResumePreview from './components/ResumePreview';
import Navbar from './components/Navbar';
import TemplateSelection from './components/TemplateSelection';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<TemplateSelection />} />
        <Route path="/create/form/:templateId" element={<ResumeForm />} />
        <Route path="/resumes" element={<ResumeList />} />
        <Route path="/edit/:id" element={<EditResume />} />
        <Route path="/preview/:id" element={<ResumePreview />} />
      </Routes>
    </Router>
  );
}

export default App;