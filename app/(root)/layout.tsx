import React, { ReactNode } from 'react';
import Navbar from '../../components/Navbar';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <main className='font-work-sans bg-[#F2E5BF]'>
    <Navbar/>

    {children}
   </main>
  );
}



