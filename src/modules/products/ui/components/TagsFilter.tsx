import { Checkbox } from "@/components/ui/checkbox";
import { useTRPC } from "@/trpc/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
interface Props{
    value?: string[] | null;
    onChange: (value: string[]) => void;
}

export const TagsFilter = ({ value, onChange }: Props) => {
    const trpc=useTRPC();
    const {data,isLoading,hasNextPage,isFetchingNextPage,fetchNextPage}=useInfiniteQuery(trpc.tags.getMany.infiniteQueryOptions(
        {
        limit:2,
    },
    {
        getNextPageParam: (lastPage) => {
            return lastPage.docs.length>0 ? lastPage.nextPage : undefined;
        },
    }

) )
const onClickTag = (tag: string) => {

        if(value?.includes(tag)){
            onChange(value.filter((t) => t !== tag) || []);
        }
        else{
            onChange([...(value || []), tag]);
        }
    }
return(
  <div className="flex flex-col gap-y-2">
    {isLoading?(
        <div className="flex items-center justify-center p-4">
            <LoaderIcon className="size-4 animate-spin" />
        </div>
    ):(
        data?.pages.map((page) => 
            
            page.docs.map((tag) => (
                <div key={tag.id} 
                className="flex items-center justify-between cursor-pointer "
                onClick={() => onClickTag(tag.name)}
                >
                    <p className="font-medium">{tag.name}</p>
                    <Checkbox
                    checked={value?.includes(tag.name) }
                    onCheckedChange={()=>onClickTag(tag.name)}

                    />
            

                </div>
            ))
    ))}
    {hasNextPage && (
        <button disabled={isFetchingNextPage}
            className="underline  font-medium cursor-pointer justify-start disabled:opacity-50"
            onClick={() => fetchNextPage()           }
        >
            Load more
        </button>
    )}
  </div>
)

}