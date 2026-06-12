import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY is not configured" });
  }

  try {
    const { prompt, systemInstruction } = req.body ?? {};

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction:
          systemInstruction || "You are an expert marketing copywriter.",
        temperature: 0.7,
      },
    });

    return res.status(200).json({ text: response.text ?? "" });
  } catch (error: any) {
    console.error("Gemini Error:", error);
    return res.status(500).json({ error: error?.message || "Internal server error" });
  }
}