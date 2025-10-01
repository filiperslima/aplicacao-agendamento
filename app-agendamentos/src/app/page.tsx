import Image from "next/image";
import Login from "./(auth)/login/page";
import { redirect } from "next/navigation";

export default function Home() {
  return redirect('/login')
}
