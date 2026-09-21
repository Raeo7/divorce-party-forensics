import { buildSubmission } from "@/data/submission";

export const dynamic = "force-static";

export function GET() {
  return new Response(JSON.stringify(buildSubmission(), null, 2), {
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
