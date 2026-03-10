import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Navigation links stored server-side instead of in the client bundle
const NAV_LINKS: Record<string, { label: string; link: string }> = {
  regns: {
    label: "REGNs/Licenses Details",
    link: "https://adventmanagementconsulting-my.sharepoint.com/personal/shahabuddin_adventmcs_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fshahabuddin%5Fadventmcs%5Fcom%2FDocuments%2FCompany%20Data%20Share%20Point%2FWhale%20Cloud%2FS%26CE&ga=1",
  },
  returns: {
    label: "Returns",
    link: "https://adventmanagementconsulting-my.sharepoint.com/personal/shahabuddin_adventmcs_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fshahabuddin%5Fadventmcs%5Fcom%2FDocuments%2FCompany%20Data%20Share%20Point%2FWhale%20Cloud%2F2024%2FReturn%5F2024&ga=1&startedResponseCatch=true",
  },
  registers: {
    label: "Registers and Records",
    link: "https://adventmanagementconsulting-my.sharepoint.com/personal/shahabuddin_adventmcs_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fshahabuddin%5Fadventmcs%5Fcom%2FDocuments%2FCompany%20Data%20Share%20Point%2FWhale%20Cloud%2F2025%2FRegisters&ga=1",
  },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Verify the user is authenticated
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } }
  );

  const token = authHeader.replace("Bearer ", "");
  const { data, error } = await supabase.auth.getClaims(token);
  if (error || !data?.claims) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ links: NAV_LINKS }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
