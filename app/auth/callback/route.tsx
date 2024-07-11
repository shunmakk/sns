import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import {cookies} from 'next/headers';

export async function GET(request: NextRequest){
 const requestUrl = new URL(request.url);
 //githubでログインした際にurlに含まれるコードを取得する
 const code =  requestUrl.searchParams.get("code");

 if(code){
    const supabase = createRouteHandlerClient({cookies});
    //supbaseにgithubでoauth認証したことを伝える
    await supabase.auth.exchangeCodeForSession(code);
 }

 //ホームにリダイレクト
 return NextResponse.redirect(requestUrl.origin);
}
