'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation";

export default function Likes({post}){

    const router = useRouter()

    const handleClick = async() => {
        const supbase = createClientComponentClient();
        const {data:{user},}= await supbase.auth.getUser()


        if(post.user_has_liked_post){
             await supbase.from('likes').delete().match({user_id: user?.id, post_id: post.id});
        }else{
             await supbase.from('likes').insert({user_id: user?.id, post_id: post.id});
              router.refresh()
        }


    }


    return(
        <button onClick={handleClick}>{post.likes}いいね</button>
    )

}