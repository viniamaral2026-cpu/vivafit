import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // O roteiro a seguir extrai o código de autorização da URL de retorno
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // se "next" estiver no parâmetro, use-o como URL de redirecionamento
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // URL para redirecionar se o login falhar ou o código não estiver presente
  return NextResponse.redirect(`${origin}/auth`);
}
