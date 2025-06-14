import { loadProductFilters } from '@/modules/products/searchParams';
import { ProductsList ,ProductListSkeleton} from '@/modules/products/ui/components/ProductsList';
import { ProductListView } from '@/modules/products/ui/views/ProductListView';
import { getQueryClient,trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { SearchParams } from 'nuqs/server';
import React, { Suspense } from 'react'
interface Props{
    params:Promise<{subcategory:string}>;
      searchParams:Promise<SearchParams>;
    


}


const Categorypage = async ({ params,searchParams }: Props) => {
  const { subcategory } = await params;
  const filters=await loadProductFilters(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({
    category:subcategory,
    ...filters,
  }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
     <ProductListView category={subcategory} />
    </HydrationBoundary>
  )
}
export default Categorypage