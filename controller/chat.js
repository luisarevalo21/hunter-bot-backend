const express = require("express");
const router = express.Router();
const openai = require("../openai");
const fs = require("fs");
const path = require("path");
const kbPath = path.resolve(__dirname, "../mockdata/knowledge.json");

let knowledgeBase = { jobs: [] };

knowledgeBase = JSON.parse(fs.readFileSync(kbPath, "utf-8"));

router.post("/chat", async (req, res) => {
  const { message, language = "en", conversation_history = [] } = req.body;

  console.log("language:", language);
  // return res.status(200).json({
  //   response: "This is a placeholder response.",
  //   intent: "job_search",
  // });
  //get the intent what is the user searching for
  //next get the location from the message
  //finally search the knowledge base for jobs in that location
  try {
    // Build conversation history for OpenAI
    const messages = [
      {
        role: "system",
        content: `You are an assistant that will assist users in finding jobs, legal information, or resources. Here is your data set of knowledge: ${JSON.stringify(
          knowledgeBase
        )} only use this data to answer queries. Here is the chosen language: ${language}. If the language is en return only english content no need to translate.
        return the data in the following json format:
        {
          "response": "your response",
          "intent": "job_search"
        } `,
      },
    ];

    // Add conversation history if available
    if (conversation_history && conversation_history.length > 0) {
      conversation_history.forEach(entry => {
        if (entry.user) {
          messages.push({
            role: "user",
            content: entry.user,
          });
        }
        if (entry.hunter_bot) {
          messages.push({
            role: "assistant",
            content: entry.hunter_bot,
          });
        }
      });
    }

    // Add current user message
    messages.push({
      role: "user",
      content: message,
    });

    // Ask OpenAI to extract intent
    const intentResp = await openai.chat.completions.create({
      model: "gpt-5-nano",
      messages: messages,
    });

    // Extract the content from OpenAI response
    const responseContent = intentResp.choices[0].message.content.trim();
    // Parse the JSON response from OpenAI
    let parsedResponse;
    try {
      // Try to parse the response as JSON
      parsedResponse = JSON.parse(responseContent);
      console.log("Parsed response:", parsedResponse);
    } catch (err) {
      console.error("Error parsing OpenAI response as JSON:", err);
      // If parsing fails, create a fallback response
      parsedResponse = {
        response: "Sorry, I couldn't process your request properly.",
        intent: "error",
      };
    }

    return res.status(200).json(parsedResponse);
  } catch (error) {
    console.error("Error processing chat:", error);
    return res.status(500).json({
      error: error.message || "An unknown error occurred",
      response: "Sorry, there was an error processing your request.",
      intent: "error",
    });
  }
});

module.exports = router;
