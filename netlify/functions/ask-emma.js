export async function handler(event) {
  const { prompt } = JSON.parse(event.body);

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are Emma, a warm, gentle assistant for seniors. Speak clearly, answer simply, and be supportive."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const data = await res.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: data.choices[0].message.content })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Emma is having trouble responding." })
    };
  }
}
