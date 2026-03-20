import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});

export const chatSession = model.startChat({
    generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
    },
});

export const parseResumeWithAI = async (text) => {
    const prompt = `
    Analyze the following resume text and extract data into a structured JSON format.
    The JSON should match this schema:
    {
        "fullName": "String",
        "jobTitle": "String",
        "address": "String",
        "phone": "String",
        "email": "String",
        "summary": "String",
        "skills": [{"name": "String", "rating": 0}],
        "experience": [{"title": "String", "companyName": "String", "city": "String", "state": "String", "startDate": "String", "endDate": "String", "currentlyWorking": false, "workSummary": "String"}],
        "education": [{"universityName": "String", "degree": "String", "major": "String", "startDate": "String", "endDate": "String", "description": "String"}],
        "projects": [{"title": "String", "description": "String", "techStack": "String", "link": "String", "github": "String"}],
        "achievements": [{"title": "String", "description": "String"}],
        "certifications": [{"name": "String", "issuer": "String", "date": "String"}]
    }
    
    Resume Text:
    ${text}
    `;

    try {
        const result = await chatSession.sendMessage(prompt);
        const response = result.response;
        return JSON.parse(response.text());
    } catch (error) {
        console.error('Error parsing resume with AI:', error);
        throw error;
    }
};
