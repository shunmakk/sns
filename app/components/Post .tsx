'use client'
import { useEffect, useOptimistic } from "react"
import Likes from "./Likes"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function Post({posts}: {posts: PostWithAuthor[]}) {


    //いいねの楽観的UI更新
  const [optimisticPosts,addOptimisticPost] = useOptimistic<PostWithAuthor[],PostWithAuthor>(posts,(currentOptimisticPosts,newPost) => {
    const newOptimisticPost = [...currentOptimisticPosts];
    const index =  newOptimisticPost.findIndex((post) => post.id === newPost.id);

    newOptimisticPost[index] = newPost;
    return newOptimisticPost;
});


//リアルタイムに投稿が反映される supbaseのSubscribe to channelを参照
const supbase = createClientComponentClient();
const router = useRouter();

useEffect(() => {
  supbase.channel("何でも良い").on('postgres_changes', { event: '*', schema: 'public', table: 'Post' }, payload => {
    console.log('Change received!', payload)
  })
  .subscribe()
},[supbase,router])



    return (
        <>
        {optimisticPosts?.map((post) => (
           <div key={post.id}>
             <p>{post.author?.name} {post.author?.username}</p>
             <p>{post.title}</p>
             <Likes post={post} addOptimisticPost={addOptimisticPost}/>
           </div>
         ))}
       </>
    )
}