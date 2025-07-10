import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ResumeForm from './components/ResumeForm';
import ResumeList from './components/ResumeList';
import EditResume from './components/EditResume';
import ResumePreview from './components/ResumePreview';
import Navbar from './components/Navbar';
import TemplateSelection from './components/TemplateSelection';
import Login from './components/Login';
import Register from './components/Register';

// Import AuthProvider from your context
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider> {/* Wrap your app in the provider */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<TemplateSelection />} />
          <Route path="/create/form/:templateId" element={<ResumeForm />} />
          <Route path="/resumes" element={<ResumeList />} />
          <Route path="/edit/:id" element={<EditResume />} />
          <Route path="/preview/:id" element={<ResumePreview />} />
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
