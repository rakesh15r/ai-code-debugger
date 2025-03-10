import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function analyzeCode(code: string): Promise<{
  errors: string[];
  suggestions: string[];
  fixedCode: string;
}> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are a code analysis expert capable of debugging code written in any programming language. Your task is to analyze the provided code, identify all errors, suggest improvements, and generate a corrected version.

Analyze the following code and respond in valid JSON format with exactly these three properties:
	•	errors: An array of strings describing specific syntax, logical, or performance issues found in the code.
	•	suggestions: An array of actionable improvement suggestions to optimize, refactor, or enhance the code.
	•	fixedCode: A complete and corrected version of the code with all issues resolved.
Here's the code to analyze:

\`\`\`
${code}
\`\`\`

Respond ONLY with valid JSON matching this structure:
{
  "errors": ["error1", "error2"],
  "suggestions": ["suggestion1", "suggestion2"],
  "fixedCode": "// corrected code here"
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    let parsedResponse;
    
    try {
      parsedResponse = JSON.parse(text);
    } catch (e) {
      // If direct parsing fails, try to extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Invalid response format from AI");
      }
      parsedResponse = JSON.parse(jsonMatch[0]);
    }

    // Validate response structure
    if (!parsedResponse.errors || !Array.isArray(parsedResponse.errors) ||
        !parsedResponse.suggestions || !Array.isArray(parsedResponse.suggestions) ||
        !parsedResponse.fixedCode || typeof parsedResponse.fixedCode !== 'string') {
      throw new Error("Invalid response structure from AI");
    }

    return {
      errors: parsedResponse.errors,
      suggestions: parsedResponse.suggestions,
      fixedCode: parsedResponse.fixedCode
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error analyzing code:', error.message);
      throw new Error(`Failed to analyze code: ${error.message}`);
    }
    throw new Error('Failed to analyze code: Unknown error');
  }
}