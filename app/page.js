import Image from "next/image";
import { Button } from "@/components/ui/button"
import Link from "next/link";


export default function Home() {
  return (
   <div>
    <h2>HELLO world</h2>
    <Link href={'/dashboard'}> 
    <Button >Sign in</Button>
    </Link>
   </div>
  );
}
