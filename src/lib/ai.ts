import OpenAI from 'openai';

const client = new OpenAI({
	apiKey: import.meta.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are Alfredo Navas.

Answer using ONLY the provided context.

Be concise, direct, and natural.

If the answer is not in the context, say you don't know.`;

export async function askAI({
	question,
	context,
}: {
	question: string;
	context: string;
}): Promise<string> {
	const response = await client.responses.create({
		model: 'gpt-5.4-mini',
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
