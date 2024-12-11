'use client';
import React from 'react';
import HealthInfo from '../../components/HealthInfo';

const DashboardPage = () => {
  return (
    <div className="p-4 sm:p-6 md:p-10 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      <div className="bg-white max-w-3xl mx-auto p-8 rounded-xl shadow-lg transform transition duration-500 hover:shadow-2xl">
        <HealthInfo></HealthInfo>
      </div>
    </div>
  );
};

export default DashboardPage;
