import { model } from "../../config/openAI";

export class AiService {
    static crearRespuesta = async (solicitud: string) => {
        const result = await model.generateContent(solicitud);
        if (!result.response.candidates) return 'Sin respuesta'
        return result.response.candidates[0].content.parts[0]
    };
}
