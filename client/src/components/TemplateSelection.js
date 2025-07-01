// src/components/TemplateSelection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const templates = [
  { id: 'TemplateOne', name: 'Classic' },
  { id: 'TemplateTwo', name: 'Modern' },
  { id: 'TemplateThree', name: 'Elegant' },
];

function TemplateSelection() {
  const navigate = useNavigate();

  const handleSelect = (id) => {
    navigate(`/create/form/${id}`);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Resume Template</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition"
            onClick={() => handleSelect(template.id)}
          >
            <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
            <p className="text-sm text-gray-600">Click to use this template</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TemplateSelection;
