'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation";
import { useTransition } from "react";

type Post = Database["public"]["Tables"]["posts"]["Row"];
type Profile = Database["public"]["Tables"]["profiles"]["Row"];

type PostWithAuthor = Post & {
    author:  Profile,
    likes: number,
    user_has_liked_post:boolean;
}

export default function Likes({post,addOptimisticPost}: {post: PostWithAuthor; addOptimisticPost:(newPost: PostWithAuthor) => void }){

    const router = useRouter()
    const [isPending,startTransition] = useTransition();

    const handleClick = async() => {
        const supbase = createClientComponentClient();
        const {data:{user},}= await supbase.auth.getUser()


        if(post.user_has_liked_post){
            addOptimisticPost({
                ...post, //既存のポスト
                likes: post.likes - 1,  //lilesの属性を更新する -1
                user_has_liked_post: !post.user_has_liked_post
            });
             await supbase.from('likes').delete().match({user_id: user?.id, post_id: post.id});
             router.refresh()
        }else{
            addOptimisticPost({
                ...post, //既存のポスト
                likes: post.likes + 1,  //lilesの属性を更新する  +1
                user_has_liked_post: !post.user_has_liked_post
            });
             await supbase.from('likes').insert({user_id: user?.id, post_id: post.id});
             router.refresh()
        }
    }

    return(
        <button onClick={() => startTransition(() => handleClick())}>{post.likes}いいね</button>
    )

}