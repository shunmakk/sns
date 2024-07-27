import type { Database as DB } from "./lib/database.types.ts";


type Post = DB["public"]["Tables"]["posts"]["Row"];
type Profile = DB["public"]["Tables"]["profiles"]["Row"];

//グローバルにデータベースを使う
declare global{
 type Database = DB


type PostWithAuthor = Post & {
    author:  Profile,
    likes: number,
    user_has_liked_post:boolean;
}

}