
export default function NewPost(){

    //据え置き
    const addPost = async () => {
     "use server";
    }

    return (
        <form action={addPost}>
        <input type="text" name="title" className="border-slate-400 "/>
    </form>
    )
}