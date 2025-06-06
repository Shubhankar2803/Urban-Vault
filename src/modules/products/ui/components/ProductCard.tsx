import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props{
id:string;
name:string;
price:number;
imageUrl?:string | null;
authorUsername:string;
authorImageUrl?:string | null;
reviewRating:number;
reviewCount:number;

};

export const ProductCard = ({
id,
name,
price,
imageUrl,
authorUsername,
authorImageUrl,
reviewRating,
reviewCount,



}: Props) => {
    return (

    <Link href={`/products/${id}`}               >
        <div className=" hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform-shadow]
         border rounded-md bg-white overflow-hidden flex flex-col hover:">
            <div className="aspect-square relative ">
                <Image
                alt={name}
                fill
                src={imageUrl || ""}
                className="object-cover"
                
                />

            </div>

            <div className="p-4 border-y flex flex-cole gap-3 flex-1">

                <h2 className="tetx-lg font-medium line-clamp-4">
                    {name}
                </h2>
                <div className="flex items-center gap-2" 
                onClick={()=>{}}
                >

                    {authorImageUrl && (
                    <Image 
                    alt={authorUsername}
                    src={authorImageUrl}
                    width={16}
                    height={16}
                    className="rounded-full border shrink-0 size-[16px] "
                    
                    />
                    
                    )}

                    <p className="text-sm underline font-medium">{authorUsername}</p>

                </div>
                {reviewCount > 0 && (
                    <div className="flex items-center gap-1">

                        <StarIcon className="size-3.5 fill-black" />
                        <p className="text-sm font-medium">
                            {reviewRating}({reviewCount})
                        </p>
                    </div>


                )}

            </div>
            <div className="p-4 ">
                <div className="relative px-2 py-1 border bg-black text-white w-fit ">

                    <p className="text-sm font-medium text-white">{
                        new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            maximumFractionDigits:0
                        }).format(Number(price))
                        }</p>
                </div>

            </div>

        </div>
    
    </Link>
    )

}

export const ProductCardSkeleton = () => {
    return(
        <div className="w-full aspect-3/4  bg-neutral-300 animate-pulse rounded-lg">

        </div>
    )
}