import { NextRequest } from 'next/server'
import { supabase } from '@/lib'

export default async function proxy(request: NextRequest) {
  return await supabase.updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
