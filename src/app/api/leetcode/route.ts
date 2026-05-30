export async function GET() {
  try {
    const res = await fetch(
      "https://alfa-leetcode-api.onrender.com/rajarshi_2005/calendar",
      {
        next: { revalidate: 600 }
      }
    );

    if (!res.ok) {
      console.warn(`Failed to fetch leetcode calendar: status ${res.status}`);
      return Response.json({});
    }

    const data = await res.json();
    if (!data || !data.submissionCalendar) {
      return Response.json({});
    }
    const parsed = JSON.parse(data.submissionCalendar);

    return Response.json(parsed);
  } catch (error) {
    console.error("Error fetching LeetCode calendar:", error);
    return Response.json({});
  }
}
