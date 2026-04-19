export async function GET() {
  const res = await fetch(
    "https://alfa-leetcode-api.onrender.com/rajarshi_2005/calendar",
    {
      next: { revalidate: 3600 }, // cache 1 hour
    },
  );

  const data = await res.json();
  const parsed = JSON.parse(data.submissionCalendar);

  return Response.json(parsed);
}
