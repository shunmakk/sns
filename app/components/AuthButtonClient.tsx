'use client'
import {Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const AutuButtonClient = ({session}: {session: Session | null}) => {

    const router = useRouter();
    const supbase = createClientComponentClient();
    // const [session,setSession] = useState<Session | null>();


    // useEffect(() => {
    //     const getSession = async () => {
    //     const {data} = await supbase.auth.getSession();
    //     setSession(data.session);
    //     };
    //     getSession();
    // })

    const handleSignIn = async () => {
        await supbase.auth.signInWithOAuth({
        provider: "github",
        options: {
            redirectTo: "http://localhost:3000/auth/callback"
        }
        });
    };

    const handleSignOut = async () => {
        await supbase.auth.signOut();
        router.refresh();
    };

  return (
    <>
    {session ? <button onClick={handleSignOut}>ログアウト</button>
            :  <button onClick={handleSignIn}>サインイン</button>
    }
    </>
  
  )
}

export default AutuButtonClient