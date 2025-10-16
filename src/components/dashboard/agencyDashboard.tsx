"use client";

import React, { useState, useEffect } from 'react';
import { useAgencyDashboard } from '@/app/hooks/agency/useAgencyDashboard';
import { AgencyDashboardRspData, AgencyUpdateData } from '../types';
import AgencyModal from '../utils/agencyModal';
import LoadingScreen from '../utils/loadingScreen';

const AgencyDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isPending: pending, error, refetch } = useAgencyDashboard();
  // another way to destructure in typescript
  // const agency = (data?.agency_summary || {} as AgencyDashboardRspData['agency_summary']);
  // const agency = (data?.agency_summary || {} as {
  //   company_name: string;
  //   email: string;
  //   contact_details: string;
  //   address: string;
  //   is_active: boolean;
  // });
  const isPending = true;
  const agency = data?.agency_summary;

  const company_name = agency?.company_name ?? '';
  const email = agency?.email ?? '';
  const contact_details = agency?.contact_details ?? '';
  const address = agency?.address ?? '';
  const is_active = agency?.is_active ?? false;
    

  // const handleUpdate = (data: AgencyUpdateData) => {
  //   onUpdateAgency(data);
  // };

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <div className="max-w-4xl mx-auto">
      {isPending ? (
        <LoadingScreen />
      ) : (

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
                <p className="mt-1 text-lg text-gray-800">{company_name}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600">Email</label>
                <p className="mt-1 text-lg text-gray-800">{email}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600">Contact Details</label>
                <p className="mt-1 text-lg text-gray-800">{contact_details || 'Not provided'}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Address</label>
                <p className="mt-1 text-lg text-gray-800">{address}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600">Status</label>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  is_active 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

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
