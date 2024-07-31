'use client'
import { useOptimistic } from "react"
import Likes from "./Likes"

export default function Post({posts}: {posts: PostWithAuthor[]}) {


    //いいねの楽観的UI更新
  const [optimisticPosts,addOptimisticPost] = useOptimistic<PostWithAuthor[],PostWithAuthor>(posts,(currentOptimisticPosts,newPost) => {
    const newOptimisticPost = [...currentOptimisticPosts];
    const index =  newOptimisticPost.findIndex((post) => post.id === newPost.id);

    newOptimisticPost[index] = newPost;
    return newOptimisticPost;
});



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