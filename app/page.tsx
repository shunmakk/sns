
import Image from "next/image";
import {cookies} from 'next/headers';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import AuthButtonServer from "./components/AuthButtonServer";

export default async function Home() {

  console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  console.log(cookies)
  const supbase = createServerComponentClient({cookies});
  const {data: posts} = await supbase.from('Posts').select();
  console.log(posts);

  


  return (
    <>
    <AuthButtonServer/>
    <pre>
      {JSON.stringify(posts,null,2)}
    </pre>
    </>

  );
}
