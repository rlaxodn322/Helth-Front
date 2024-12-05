'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import React from 'react';
import Login from './login/01/page';
export default function Home() {
  return (
    //<main className="flex min-h-screen flex-col items-center justify-between p-24"></main>

    <div style={{ width: '1200px', margin: '0 auto', height: '1200px' }}>
      <Login></Login>
    </div>
  );
}
