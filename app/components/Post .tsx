import Likes from "./Likes"

export default function Post({posts}: {posts: PostWithAuthor[]}) {
    return (
        <>
        {posts?.map((post) => (
           <div key={post.id}>
             <p>{post.author?.name} {post.author?.username}</p>
             <p>{post.title}</p>
             <Likes post={post}/>
           </div>
         ))}
       </>
    )
}