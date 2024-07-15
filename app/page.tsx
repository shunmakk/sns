import {cookies} from 'next/headers';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import AuthButtonServer from "./components/AuthButtonServer";
import { redirect } from "next/navigation";
import { Database } from "./lib/database.types";
import NewPost from './components/NewPost ';

export default async function Home() {

  console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  console.log(cookies)
  const supbase = createServerComponentClient<Database>({cookies});
  const {data: {session}} = await supbase.auth.getSession();

  if(!session){
    redirect("/login");
  }


  const {data: posts} = await supbase.from('posts').select("*, profiles(*)");

  return (
    <>
    <AuthButtonServer/>
    <NewPost/>
    <pre>
      {JSON.stringify(posts,null,2,)}
    </pre>
    </>

  );
}
