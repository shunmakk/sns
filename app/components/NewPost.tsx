import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import {cookies} from 'next/headers'

export default function NewPost(){

    //据え置き
    const addPost = async (formData: FormData) => {
     "use server";
     const title = String(formData.get('title'));
     console.log(title)
     const supabase =  createServerActionClient<Database>({cookies});
     const {data: {user},} = await supabase.auth.getUser();
     const res =    await  supabase.from("posts").insert({title,user_id: user?.id});
     console.log(res)
     revalidatePath('/')

    };

    return (
        <form action={addPost}>
        <input type="text" name="title" className="border-slate-400 "/>
    </form>
    )
}