import { onRequest } from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2/options";
import { defineSecret } from "firebase-functions/params";
import OpenAI from "openai";
import corsLib from "cors";

// ✅ 设置资源限制
setGlobalOptions({
  region: "us-central1",
  memory: "512MiB",
  timeoutSeconds: 60,
  cpu: 1,
});

// ✅ 声明 secret
const OPENAI_API_KEY = defineSecret("OPENAI_API_KEY");
const cors = corsLib({ origin: true });

export const getAdvice = onRequest({ secrets: [OPENAI_API_KEY] }, (req, res) => {
  cors(req, res, async () => {
    const userMessage = req.body.message;

    if (!userMessage) {
      res.status(400).send("Missing user message");
      return;
    }

    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY.value(),
    });

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "你是一个心理咨询师助手，提供专业建议。" },
          { role: "user", content: userMessage },
        ],
      });

      const reply = completion.choices[0].message?.content;
      res.send({ response: reply });
    } catch (err: any) {
      console.error("OpenAI Error:", err?.response?.data || err.message || err);
      res.status(500).json({ error: "OpenAI API 调用失败" });
    }
  });
});
