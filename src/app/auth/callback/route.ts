import { createClient } from "utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;
  const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();

  console.log("Checking Redirecting to: ", `${origin}${redirectTo}`);
  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  console.log("Redirecting to: ", `${origin}${redirectTo}`);
  if (redirectTo) {
    return NextResponse.redirect(`${origin}${redirectTo}`);
  }

  console.log("Redirecting to: ", `${origin}/private`);
  return NextResponse.redirect(`${origin}/private`);
}