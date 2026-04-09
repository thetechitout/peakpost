exports.handler = async function(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  let email;
  try {
    const body = JSON.parse(event.body);
    email = body.email;
  } catch {
    return { statusCode: 400, body: "Invalid request" };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { statusCode: 400, body: "Invalid email" };
  }

  try {
    const response = await fetch("https://api.beehiiv.com/v2/publications/pub_a97db4ba-124b-48b9-84ad-9bc28e4f948f/subscriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer rVJ8F8m4xsVwxts36uOu7TgSFsvJ7CfcaxhtkM2qsWwAoY5JhTJF04u2ImzIDdc1"
      },
      body: JSON.stringify({
        email: email,
        reactivate_existing: false,
        send_welcome_email: true,
        utm_source: "peakpost",
        utm_medium: "lead_magnet",
        utm_campaign: "peakpost_tool"
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ success: true, data })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
};
