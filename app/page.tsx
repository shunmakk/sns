import {cookies} from 'next/headers';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import AuthButtonServer from "./components/AuthButtonServer";
import { redirect } from "next/navigation";
import { Database } from "./lib/database.types";
import NewPost from './components/NewPost';
import Post from './components/Post';

export default async function Home() {

  console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  console.log(cookies)
  const supbase = createServerComponentClient<Database>({cookies});
  const {data: {session}} = await supbase.auth.getSession();

  if(!session){
    redirect("/login");
  }

  const {data} = await supbase.from('posts').select("*, author:profiles(*),likes(user_id)");

  //無限いいねを防ぐ
  const posts = data?.map((post) => ({
    ...post,
    author: Array.isArray(post.author) ? post.author[0] : post.author,
    user_has_liked_post: !!post.likes.find((like) => like.user_id === session.user.id),
    likes: post.likes.length,
  })) ?? [];

  return (
    <>
    <AuthButtonServer/>
    <NewPost/>
    <Post posts={posts}/>
    </>

  );
}
