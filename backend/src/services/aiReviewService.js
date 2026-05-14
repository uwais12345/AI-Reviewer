const { Groq } = require('groq-sdk');

// We initialize Groq inside the function or globally, but since env vars 
// might not be loaded initially, let's just make sure it uses process.env.GROQ_API_KEY
const getGroqClient = () => {
  return new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
};

const generateAIReview = async (prDiff) => {
  const prompt = `You are a senior software engineer and expert code reviewer.
Analyze the following pull request diff.
Review for:
- bugs
- security vulnerabilities
- performance issues
- readability
- maintainability
- best practices

Return response ONLY in JSON format matching this structure:
{
  "summary": "String explaining the overall review",
  "severity": "LOW, MEDIUM, HIGH, or CRITICAL",
  "score": "Number from 0 to 100 (where 100 is perfect)",
  "suggestions": [
    {
      "file": "filename",
      "issue": "description of the issue",
      "severity": "LOW, MEDIUM, HIGH, or CRITICAL",
      "fix": "suggested fix code or explanation"
    }
  ]
}

Here is the Pull Request Diff:
${prDiff}`;

  try {
    const groq = getGroqClient();
    const response = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.2,
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0]?.message?.content;
    return JSON.parse(content);
  } catch (error) {
    console.error("AI Review Generation Error:", error);
    throw new Error('Failed to generate AI review');
  }
};

module.exports = {
  generateAIReview,
};
