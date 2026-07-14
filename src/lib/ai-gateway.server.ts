import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

// Placeholder — this file is only used if we route via AI SDK later.
// The chat route uses raw fetch to the Lovable AI Gateway for simplicity.
export function createLovableAiGatewayProvider(apiKey: string) {
  return createOpenAICompatible({
    name: "lovable",
    baseURL: "https://ai.gateway.lovable.dev/v1",
    headers: { "Lovable-API-Key": apiKey },
  });
}
