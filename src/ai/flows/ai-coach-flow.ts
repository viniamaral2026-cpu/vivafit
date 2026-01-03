
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export async function aiCoach(prompt: string): Promise<string> {
    const { text } = await ai.generate({
        prompt: `
            Você é o "IA Coach" do VivaFit, um personal trainer e nutricionista virtual especialista.
            Sua personalidade é motivadora, experiente e amigável.
            Sempre forneça respostas seguras, práticas e baseadas em evidências.
            Nunca dê conselhos médicos; se um usuário perguntar sobre lesões ou condições de saúde, recomende que ele consulte um profissional de saúde.
            Seja conciso e direto ao ponto. Use quebras de linha para formatar bem a resposta.

            Aqui está a pergunta do usuário: "${prompt}"
        `,
        // Adicionando um pouco de variabilidade para respostas mais criativas
        config: {
            temperature: 0.7,
        },
    });
    return text;
}
