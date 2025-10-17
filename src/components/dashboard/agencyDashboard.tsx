"use client";

import React, { useState } from 'react';
import { useAgencyDashboard, useAgencyUpdate } from '@/app/hooks/agency/useAgencyDashboard';
import { AgencyUpdateData } from '../types';
import AgencyModal from '../utils/agencyModal';
import LoadingScreen from '../utils/loadingScreen';
import AlertModal, { AlertType } from '../utils/alertModal';

const AgencyDashboard = () => {
  const [editModal, setEditModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [alertType, setAlertType] = useState<AlertType>('success');
  const [modalMessage, setModalMessage] = useState({ title: 'Profile Updated!', subtitle: 'User profile updated successfully!!' });
  const { data, isPending, error, refetch } = useAgencyDashboard();
  const { mutate, isPending: updatePending } = useAgencyUpdate();

  // another way to destructure in typescript
  // const agency = (data?.agency_summary || {} as AgencyDashboardData['agency_summary']);
  // const agency = (data?.agency_summary || {} as {
  //   company_name: string;
  //   email: string;
  //   contact_details: string;
  //   address: string;
  //   is_active: boolean;
  // });

  const agency = data?.agency_summary ?? null;

  const company_name = agency?.company_name ?? '';
  const email = agency?.email ?? '';
  const contact_details = agency?.contact_details ?? '';
  const address = agency?.address ?? '';
  const is_active = agency?.is_active ?? false;
  // const role = agency?.role ?? '';
    

  const handleUpdate = (data: AgencyUpdateData) => {
    console.log(data);
    mutate(
      { ...data },
      {
        onSuccess: (data) => {
          refetch();
          setEditModal(false);
          setAlertType('success');
          setAlertModal(true);
          setModalMessage({ title: 'Profile Updated!', subtitle: 'User profile updated successfully!!' });
          console.log(data);
        },
        onError: (err) => {
          setAlertType('error');
          setAlertModal(true);
          setModalMessage({ title: 'Profile Update Failed!', subtitle: 'Something went wrong!' });
          console.log(err);
        }
      }
    )
  };

  return (
    <div className="max-w-4xl mx-auto">
      {isPending ? (
        <LoadingScreen />
      ) : (

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Agency Dashboard</h1>
            <button
              onClick={() => setEditModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 cursor-pointer"
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
        agency={agency}
        // agency={agency as AgencyData}
        isOpen={editModal}
        onClose={() => setEditModal(false)}
        onUpdate={handleUpdate}
        loading={updatePending}
      />

      <AlertModal
        isOpen={alertModal}
        title={modalMessage.title}
        subtitle={modalMessage.subtitle}
        type={alertType}
        onClose={() => setAlertModal(false)}
      />
    </div>
  );
};

export default AgencyDashboard;
