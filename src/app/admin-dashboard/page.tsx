"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/app/components/dashboard/adminDashboard';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="container mx-auto py-8">
        <AdminDashboard />
      </div>
    </div>
  );
};

export default DashboardPage;