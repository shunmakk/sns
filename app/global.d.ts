import type { Database as DB } from "./lib/database.types.ts";

//グローバルにデータベースを使う
declare global{
 type Database = DB
}