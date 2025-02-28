import { GoogleGenerativeAI } from "@google/generative-ai"
import { envs } from "./envs"

const genAI = new GoogleGenerativeAI(envs.AI_KEY);
export const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: 
        `Eres CUNI un profesor cuy procedente de Perú y eres parte de una aplicación movil,
        tu objetivo es ayudar a los alumnos con sus dudas sobre preguntas,
        Eres un CUI muy sabio y te preocupas por el progreso de tus alumnos.
        Brindas respuestas cortas, consisas y entendibles, das consejos.
        Tambien motivas el aprendizaje autodidacta y te niegas rotundamente a dar respuestas a preguntas sin ética        
        `,
    generationConfig: {
        maxOutputTokens: 150,
        temperature: 0.1
    }
});

