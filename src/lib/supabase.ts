import {
  createBrowserClient as createSupabaseBrowserClient,
  createServerClient as createSupabaseServerClient,
} from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const createBrowserClient = () =>
  createSupabaseBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

const createServerClient = async () => {
  const cookieStore = await cookies()

  return createSupabaseServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) =>
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          ),
      },
    },
  )
}

const updateSession = async (request: NextRequest) => {
  const response = NextResponse.next({ request })

  const supabase = createSupabaseServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) =>
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          ),
      },
    },
  )

  await supabase.auth.getUser()

  return response
}

export const supabase = {
  createBrowserClient,
  createServerClient,
  updateSession,
}
