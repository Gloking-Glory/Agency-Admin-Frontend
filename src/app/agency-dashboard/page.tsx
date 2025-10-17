"use client";

import React from 'react';
import AgencyDashboard from '@/app/components/dashboard/agencyDashboard';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="container mx-auto py-8">
        <AgencyDashboard />
      </div>
    </div>
  );
};

export default DashboardPage;