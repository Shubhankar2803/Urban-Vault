"use client";
import { useTRPC } from "@/trpc/client";
import { Categories } from "./Categories";
import { SearchInput } from "./SearchInput";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CategoriesGetManyOutput } from "@/modules/categories/types";
import { useParams } from "next/navigation";
import { DEFAULT_BG_COLOR } from "@/modules/home/constant";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {BreadcrumbNavigation} from "./BreadcrumbsNavigation";

interface Props{
    data:CategoriesGetManyOutput;
};

export const SeacrhFilters=()=>{
    const trpc=useTRPC();
    const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
    const params=useParams();
    const categoryParam = params.category as string | undefined;

    const activeCategory = categoryParam || "all";
    const activeCategoryData=data.find((cat) => cat.slug === activeCategory);

    const activeCategoryColor= activeCategoryData?.color || DEFAULT_BG_COLOR;
    const activeCategoryName = activeCategoryData?.name || null;

    const activeSubcategory = params.subcategory as string | undefined;
    const activeSubcategoryName = activeCategoryData?.subcategories.find(
        (sub) => sub.slug === activeSubcategory
    )?.name || null;
   

    return(
        <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full bg-black" 
        style={{
            backgroundColor:activeCategoryColor,}}
        > 
           <SearchInput />
           <div className="hidden lg:block">
           <Categories data={data} />
           </div>
           <BreadcrumbNavigation
           activeCategory={activeCategory}
           activeCategoryName={activeCategoryName}

           activeSubcategoryName={activeSubcategoryName}    
           />

        </div>
    )
}
export const SearchFiltersLoading = () => {

return (
<div className="px-4 lg:px-12 py-8 border-b bg-black flex flex-col gap-4 w-full" style={{
backgroundColor:"#F5F5F5",}}>

<SearchInput  disabled />
<div className="hidden lg:block">
<div className="h-10" />
</div>
</div>

);
};