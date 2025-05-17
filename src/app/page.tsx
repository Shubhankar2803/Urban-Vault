import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

export default function Home() {
  return (
   <div className="flex flex-col gap-y-4">
    
    <div><Button variant="elevated">hnji bete</Button></div>
<div>
  <Input placeholder="im a input"/>
</div>
<div>
  <Progress value={50}/>
</div>
   </div>
  );
}
