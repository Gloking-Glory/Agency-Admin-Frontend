"use client";

import React, { useState } from 'react';
import { Agency, AgencyUpdateData } from '../types';
import AgencyModal from '../utils/agencyModal';

interface AgencyDashboardProps {
  agency: Agency;
  onUpdateAgency: (data: AgencyUpdateData) => void;
}

const AgencyDashboard = ({ agency, onUpdateAgency }: AgencyDashboardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdate = (data: AgencyUpdateData) => {
    onUpdateAgency(data);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Agency Dashboard</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Company Name</label>
              <p className="mt-1 text-lg text-gray-800">{agency.name}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <p className="mt-1 text-lg text-gray-800">{agency.email}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600">Contact Details</label>
              <p className="mt-1 text-lg text-gray-800">{agency.contactDetails || 'Not provided'}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Address</label>
              <p className="mt-1 text-lg text-gray-800">{agency.address}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600">City</label>
              <p className="mt-1 text-lg text-gray-800">{agency.city}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600">Country</label>
              <p className="mt-1 text-lg text-gray-800">{agency.country}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600">Status</label>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                agency.isActive 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {agency.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <AgencyModal
        isOpen={isModalOpen}
        agency={agency}
        onClose={() => setIsModalOpen(false)}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default AgencyDashboard;
