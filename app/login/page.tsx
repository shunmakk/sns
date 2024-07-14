import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AutuButtonClient from "../components/AuthButtonClient";
import { redirect } from "next/navigation";

export default async function  Login(){
    const supbase = createServerComponentClient<Database>({cookies});
    const {data: {session}} = await supbase.auth.getSession();

    if(session){
        redirect('/')
    }

    return <AutuButtonClient session={session}/>;
}