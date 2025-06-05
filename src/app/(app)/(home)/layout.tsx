import React, { Suspense } from 'react'

import Navbar from '@/modules/home/ui/components/navbar';
import FooterSection from '@/modules/home/ui/components/footer';
import { SeacrhFilters } from '@/modules/home/ui/components/search-filters';
import configPromise from '@payload-config'

 import { getQueryClient, trpc } from '@/trpc/server';
import { HydrationBoundary,dehydrate } from '@tanstack/react-query';
interface Props {
    children:React.ReactNode;
};
const Layout =async({children}:Props) => {
  const queryClient=getQueryClient();
  void queryClient.prefetchQuery(
  trpc.categories.getMany.queryOptions()
  )
   
  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<p>Loading...</p>}>
        <SeacrhFilters  /></Suspense> </HydrationBoundary>
        {children}
        <FooterSection />
    </div>
  )
}

export default Layout