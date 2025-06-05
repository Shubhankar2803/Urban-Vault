import { ProductsList ,ProductListSkeleton} from '@/modules/products/ui/components/ProductsList';
import { getQueryClient,trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react'
interface Props{
    params:Promise<{subcategory:string}>;


}


const Categorypage =async ({params}:Props) => {
  const {subcategory} = await params;
    
     const queryClient = getQueryClient();
     void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({
      category: subcategory,
     }));

  return (
   <HydrationBoundary state={dehydrate(queryClient)}>
    <Suspense fallback={<ProductListSkeleton />}>
    <ProductsList category={subcategory} />
    </Suspense>
   </HydrationBoundary>
  )
}

export default Categorypage