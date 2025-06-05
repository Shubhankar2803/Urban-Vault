import { ProductsList ,ProductListSkeleton} from '@/modules/products/ui/components/ProductsList';
import { getQueryClient,trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react'
interface Props{
    params:Promise<{category:string}>;


}


const Categorypage =async ({params}:Props) => {
  const {category} = await params;
    
     const queryClient = getQueryClient();
     void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({
      category,
     }));

  return (
   <HydrationBoundary state={dehydrate(queryClient)}>
    <Suspense fallback={<ProductListSkeleton />}>
    <ProductsList category={category} />
    </Suspense>
   </HydrationBoundary>
  )
}

export default Categorypage