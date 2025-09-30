import { supabase } from "@/lib/supabase";
import { NextRequest } from "next/server";



export async function POST(req: NextRequest){
    try{
        let {data, error} = await supabase.auth.signInWithPassword({
            email: "filipe@ateltelecom.com.br",
            password: "123456789"
        })
        console.log(data,error)
    } catch(e){
        console.log(e)
    
    }
}