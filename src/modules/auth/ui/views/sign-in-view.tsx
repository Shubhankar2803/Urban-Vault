"use client";
import { Form,FormControl,FormField,FormItem, FormMessage, FormLabel, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {zodResolver} from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {toast} from "sonner"
import { loginSchema } from "../../schemas";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});
export const SignInView=()=>{

const router=useRouter()
const trpc=useTRPC();
const queryClient= useQueryClient();

const login=useMutation(trpc.auth.login.mutationOptions({
    onError:(error)=>{ 
        toast.error(error.message)
    } ,
    onSuccess:async()=>{
       await queryClient.invalidateQueries(trpc.auth.session.queryFilter());
         router.push("/")
    }
}))

    const form = useForm<z.infer<typeof loginSchema>>({
        mode: "all",
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }           
    });



    const onSubmit=(values:z.infer<typeof loginSchema>)=>{
        login.mutate(values)
     }
    return(
        <div className="grid grid-cols-1 lg:grid-cols-5">
    <div className="bg-[#F4F4F0] h-screen w-full lg:col-span-3 overflow-y-auto"                                                                                            >
       <Form {...form}>
        <form 
        className="flex flex-col gap-8 p-4 lg:p-16"
        onSubmit={form.handleSubmit(onSubmit)}
        >
            <div className="flex items-center justify-between mb-8">
                <Link href="/">
                <span className={cn("text-2xl font-semibold",poppins.className)}>UrbanVault</span>
                </Link>
                <Button
                asChild
                variant={"ghost"}
                className="text-base border-none underline">
                    <Link prefetch href="/sign-up">
                        SignUp
                    </Link>
                </Button>

            </div>
            <h1 className="text-3xl font-semibold">Welcome back to UrbanVault</h1>
         

               <FormField
            name="email"
            render={({field})=>(
                <FormItem>
                    <FormLabel className="text-base">
                        Email
                    </FormLabel>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                    
                <FormMessage  />
                </FormItem>
            )}
            />
               <FormField
            name="password"
            render={({field})=>(
                <FormItem>
                    <FormLabel className="text-base">
                        Passwoord
                    </FormLabel>
                    <FormControl>
                        <Input {...field} type="password" />
                    </FormControl>
                    
                <FormMessage  />
                </FormItem>
            )}
            />
            <Button
            disabled={login.isPending}
            type="submit"
            size={"lg"}
            variant="elevated"
            className="bg-black text-white hover:bg-purple-200 hover:text-primary ">
login            </Button>

        </form>

       </Form>
           </div>
    <div 
    className="h-screen w-full lg:col-span-2 hidden lg:block"
     style={{backgroundImage:"url('/auth-bg.png')",
backgroundSize:"cover", backgroundPosition:"center", backgroundRepeat:"no-repeat"
     }} 
     >
        bg Col
    </div>
        </div>
    )
}