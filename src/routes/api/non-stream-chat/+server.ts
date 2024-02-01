import OpenAI from 'openai';
import { env } from '$env/dynamic/private';

import type { RequestHandler } from './$types';

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY || '' });

export const POST: RequestHandler = (async ({ request }) => {
  // Extract the `prompt` from the body of the request
  const { messages } = await request.json();
  console.log({ messages });

  try {
    // Ask OpenAI for a completion given the prompt
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      stream: false,
      messages: messages.map((message: any) => ({
        content: message.content,
        role: message.role,
      })),
    });
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Non-Stream Chat', { error })
    // Handle errors
    return new Response(JSON.stringify({ error: 'Error from OpenAI' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}) satisfies RequestHandler;
