import { type NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  
  const supportedHeaders = ["Authorization"] as const;

  type SupportedHeaders = typeof supportedHeaders[number];
  
  const headers: Record<SupportedHeaders, string> = {} as Record<SupportedHeaders, string>;
  
  for (const supportedHeader of supportedHeaders) {
    const value = req.headers.get(supportedHeader);

    if (value) {
      headers[supportedHeader] = value;
    }
  }

  const body = await req.json();

  const response = await fetch(`${process.env["NEXT_PUBLIC_BACK_END_BASE_URL"]}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  const responseHeaders: HeadersInit = { "Content-Type": "application/json" };

  return new Response(JSON.stringify(data), { status: response.status, headers: responseHeaders });
}