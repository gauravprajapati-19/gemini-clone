/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = "";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function runChat(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    safetySettings: [
      // Block some content that promotes violence
      {
        category: HarmCategory.VIOLENCE,
        threshold: HarmBlockThreshold.BLOCK_SOME,
      },
      // Block some content that is hateful or discriminatory
      {
        category: HarmCategory.HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_SOME,
      },
      // Block some content that is sexually suggestive
      {
        category: HarmCategory.SEXUALLY_SUGGESTIVE_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_SOME,
      },
      // Block some content that is threatening
      {
        category: HarmCategory.THREAT,
        threshold: HarmBlockThreshold.BLOCK_SOME,
      },
    ],
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  console.log(result.response.text());
}

export default runChat;
