import React from 'react'
import Navbar from './navbar';
import FooterSection from './footer';
import { SeacrhFilters } from './search-filters';
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Category } from '@/payload-types';
import { CustomCategory } from './types';
interface Props {
    children:React.ReactNode;
};
const Layout =async({children}:Props) => {
    const payload=await getPayload({
    config:configPromise,
  })
  const data=await payload.find({
    collection:"categories",
    depth:1,
    pagination:false,
  where:{
    parent:{
      exists:false,
    },
  },
  sort:"name"
  });
  const formattedData: CustomCategory[]=data.docs.map((doc)=>({
    ...doc,subcategories:(doc.subcategories?.docs ??[]).map((doc)=>({
      ...(doc as Category),
      subcategories:undefined,
    }))
  }))
  console.log(JSON.stringify(data,null,2))
  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar />
        <SeacrhFilters data={formattedData} />
        {children}
        <FooterSection />
    </div>
  )
}

export default Layout