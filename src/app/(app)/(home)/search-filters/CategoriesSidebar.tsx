"use client";
import { CustomCategory } from "../types";
import { Sheet,SheetContent,SheetHeader,SheetTitle} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRight, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
interface Props {
    open:boolean;
    onOpenChange:(open:boolean)=>void;
    data:CustomCategory[];
}
export const CategoriesSidebar = ({
    open,onOpenChange,data

}:Props) => {
   const router =useRouter()
    const [parentsCategories,setParentsCategories]=useState<CustomCategory[]|null>(null);
    const [selectedCategory,setSelectedCategory]=useState<CustomCategory|null>(null);


 const currentCategories=parentsCategories??data??[];

 const handleOpenChange=(open:boolean)=>{
   setSelectedCategory(null);
   setParentsCategories(null)
   onOpenChange(open) 
}


 const handleCategoryClick=(category:CustomCategory)=>{

    if(category.subcategories&&category.subcategories.length>0){
        setParentsCategories(category.subcategories as CustomCategory[]);
        setSelectedCategory(category);
    }
    else{
        if(parentsCategories && selectedCategory){
            router.push(`/${selectedCategory.slug}/${category.slug}`)
        }
        else{
            if(category.slug==="all"){
                router.push("/")
            } 
            else{

                router.push(`/${category.slug}`)
            }
        }
        handleOpenChange(false)
    }
 }
  
 const handleBack=()=>{
    if(parentsCategories){
        setParentsCategories(null);
        setSelectedCategory(null);
    }
 }
  const backgroundColor=selectedCategory?.color || "white"
  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent 
        side="left"
        className="p-0 transition-none"
        style={{backgroundColor}}

        >
            <SheetHeader className="p-4 border-b">

                <SheetTitle>
                    Categories
                </SheetTitle>
            </SheetHeader>
            <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
                {true && (
                    <button
                     className="w-full text-left p-4 hover:bg-purple-200 hover:text-black flex items-center font-medium"
                     onClick={()=>{handleBack()}}
                    >
                        <ChevronLeftIcon className="size-4 mr-2" /> Back
                    </button>
                )}
                {currentCategories.map((category)=>(
                    <button 
                    key={category.slug}
                    onClick={()=>handleCategoryClick(category)}
                     className="w-full  cursor-pointer text-left p-4 hover:bg-purple-200 hover:text-black flex justify-between items-center font-medium"

                    >
                        {category.name}
                        {category.subcategories && category.subcategories.length>0 &&(
                            <ChevronRightIcon className="size-4" />
                        )}


                    </button>
                ))}
            </ScrollArea>

        </SheetContent>
    </Sheet>
  )
}

