"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useProductFilters } from "../../hooks/ProductFilters";
import { ProductCard, ProductCardSkeleton } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { InboxIcon } from "lucide-react";
interface Props {
    category?: string ;
}

export const ProductsList=({category}:Props)=>{
    const [filters]= useProductFilters()
    const trpc= useTRPC();
    const {data,hasNextPage,isFetchingNextPage,fetchNextPage}= useSuspenseInfiniteQuery(trpc.products.getMany.infiniteQueryOptions(
        {
        category,
        ...filters,
        lmit: 2,
    }
,{
  getNextPageParam: (lastPage) => {
    return lastPage.docs.length>0 ? lastPage.nextPage : undefined;

  },
}) );

  if(data.pages?.[0]?.docs.length===0){
    return(
        <div className="border border-black border-dashed flex items-center justify-center
        p-8 flex-col gap-y-2 bg-white w-full rounded-lg">
      <InboxIcon />
      <p className="text-bas font-medium">No Products Found</p>
        </div>
    )


  }
    return(
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 ">
            {data?.pages.flatMap((page)=>page.docs).map((product)=>(
                <ProductCard 
                key={product.id}
                id={product.id}
                name={product.name} 
                imageUrl={product.image?.url}
                authorUsername="hubhankar"
                authorImageUrl={undefined}
                 reviewRating={5}
                reviewCount={3}
                price={product.price}
               
                />
            ))}
        </div>
        <div className="flex justify-center pt-8">
            {hasNextPage && (
                <Button 
                disabled={isFetchingNextPage}
                onClick={() => fetchNextPage()}
                className="font-medium text-base disabled:opacity-50 bg-white"
                variant="elevated"
                
                
                >
                 Load More
                </Button>
            )}

        </div>
        </>
    )

}

export const ProductListSkeleton=()=>{
    return(
         <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 ">
            {Array.from({ length: 2 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
            ))}
        </div>
    )
}