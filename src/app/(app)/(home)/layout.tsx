import React from 'react'
import Navbar from './navbar';
import FooterSection from './footer';

interface Props {
    children:React.ReactNode;
};
const Layout = ({children}:Props) => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar />
        {children}
        <FooterSection />
    </div>
  )
}

export default Layout