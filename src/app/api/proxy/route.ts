// src/app/api/proxy/route.ts

import { NextRequest } from "next/server";

export const runtime = "edge"; // Optional: use 'nodejs' if you run into issues

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const question = searchParams.get("question") || "";

  const backendUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/ask";

  const response = await fetch(backendUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  const reader = response.body?.getReader();

  return new Response(
    new ReadableStream({
      async start(controller) {
        const decoder = new TextDecoder();
        while (reader) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          controller.enqueue(`data: ${chunk}\n\n`);
        }
        controller.close();
      },
    }),
    {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    }
  );
}
