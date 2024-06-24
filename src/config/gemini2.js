/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.com/gemini-api/docs/get-started/node
 */

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// **Recommended:** Use environment variables for secure API key storage
// const apiKey = process.env.GEMINI_API_KEY;
// const apiKey = "AIzaSyC5sseZXtzFen5SnajgbUm-rjhO2Yk-4lI";
const apiKey = "AIzaSyCnY3uG1OzJJ1BTDTdDKIB3Po6czQSgpXY";

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.0-pro",
});

const generationConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 0,
  maxOutputTokens: 2048,
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
