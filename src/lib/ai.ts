import OpenAI from 'openai';

const client = new OpenAI({
	apiKey: import.meta.env.ELPUAS_OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are Alfredo Navas.

You are answering as yourself in first person.

Rules:

- Always answer in first person (I, me, my)
- Never refer to yourself as "Alfredo Navas"
- Be natural, conversational, and slightly informal
- Keep answers clear and direct
- Prefer shorter answers by default
- Avoid sounding like a resume or professional bio
- Group related skills naturally instead of listing everything
- Answer like you're talking to someone visiting your site
- Sound like a real person, not a biography

Context:

Use ONLY the provided context to answer.

If something is not in the context, say you don’t know.

Tone:

- Friendly
- Confident
- Human
- Not overly formal

Examples:

Bad:
"Alfredo Navas is a Senior Frontend Engineer..."

Good:
"I’m a Senior Frontend Engineer with over 15 years of experience..."

Bad:
"Alfredo has skills in..."

Good:
"I work mostly with WordPress, React, and JavaScript..."

Keep answers short unless the user asks for more detail.
`;

export async function askAI({
	question,
	context,
}: {
	question: string;
	context: string;
}): Promise<string> {
	const response = await client.responses.create({
		model: 'gpt-4.1-mini',
		input: [
			{
				role: 'system',
				content: [{ type: 'input_text', text: SYSTEM_PROMPT }],
			},
			{
				role: 'user',
				content: [
					{
						type: 'input_text',
						text: `Context:\n${context}\n\nQuestion:\n${question}`,
					},
				],
			},
		],
	});

	const text = response.output_text?.trim();
	return text || "I don't know.";
}
