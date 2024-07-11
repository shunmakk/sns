'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'

const AutuButton = () => {

    const supbase = createClientComponentClient();

    const handleSignIn = async () => {
        await supbase.auth.signInWithOAuth({
        provider: "github",
        options: {
            redirectTo: "http//localhost:3000/auth/callback"
        }
        })
    }

  return (
    <button onClick={handleSignIn}>サインイン</button>
  )
}

export default AutuButton