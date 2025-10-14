"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/app/components/dashboard/adminDashboard';
import { User, Agency, AgencyUpdateData} from '@/app/components/types';

// Dummy agencies data
const initialAgencies: Agency[] = [
  {
    id: '1',
    email: 'agency1@example.com',
    name: 'First Agency',
    address: '123 Main Street',
    contactDetails: '+1234567890',
    city: 'New York',
    country: 'USA',
    isActive: true,
  },
  {
    id: '2',
    email: 'agency2@example.com',
    name: 'Second Agency',
    address: '456 Oak Avenue',
    contactDetails: '+0987654321',
    city: 'Los Angeles',
    country: 'USA',
    isActive: false,
  }
];

const DashboardPage = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User>({
    id: '',
    email: '',
    role: 'agency',
  });
  const [agencies, setAgencies] = useState<Agency[]>(initialAgencies);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    // const userData = localStorage.getItem('currentUser');
    // if (!userData) {
    //   router.push('/login');
    //   return;
    // }
    
    // const user = JSON.parse(userData);
    const user: User = {
      id: '10',
      email: 'admin@me.com',
      role: 'admin',
    };

    setCurrentUser(user);
    setIsLoading(false);
  }, [router]);

  const handleUpdateAgency = (agencyId: string, data: AgencyUpdateData) => {
    setAgencies(prev => prev.map(agency =>
      agency.id === agencyId
        ? { ...agency, ...data }
        : agency
    ));
  };

  const handleToggleAgencyStatus = (agencyId: string, isActive: boolean) => {
    setAgencies(prev => prev.map(agency =>
      agency.id === agencyId
        ? { ...agency, isActive }
        : agency
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="container mx-auto py-8">
        <AdminDashboard
        agencies={agencies}
        onUpdateAgency={handleUpdateAgency}
        onToggleAgencyStatus={handleToggleAgencyStatus}
        />
      </div>
    </div>
  );
};

export default DashboardPage;