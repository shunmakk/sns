'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation";

type Post = Database["public"]["Tables"]["posts"]["Row"];
type Profile = Database["public"]["Tables"]["profiles"]["Row"];

type PostWithAuthor = Post & {
    author:  Profile,
    likes: number,
    user_has_liked_post:boolean;
}



export default function Likes({post}: {post: PostWithAuthor}){

    const router = useRouter()

    const handleClick = async() => {
        const supbase = createClientComponentClient();
        const {data:{user},}= await supbase.auth.getUser()


        if(post.user_has_liked_post){
             await supbase.from('likes').delete().match({user_id: user?.id, post_id: post.id});
             router.refresh()
        }else{
             await supbase.from('likes').insert({user_id: user?.id, post_id: post.id});
             router.refresh()
        }


    }


    return(
        <button onClick={handleClick}>{post.likes}いいね</button>
    )

}