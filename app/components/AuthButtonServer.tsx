import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import {cookies} from 'next/headers';
import AutuButtonClient from "./AuthButtonClient";

export default async function AuthButtonServer(){
    const supbase = createServerComponentClient({cookies});
    const  {data: {session}} = await supbase.auth.getSession();

    return <AutuButtonClient session={session}/>;
}