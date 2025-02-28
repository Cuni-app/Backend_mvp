import { AiService } from "../../../presentation/services/ai.service";

interface GenerarRespuestaUseCase {
    execute(solicitud: string): Promise<string>;
}


export class GenerarRespuesta implements GenerarRespuestaUseCase{
    execute(solicitud: string): Promise<any> {
        return AiService.crearRespuesta(solicitud)
    }
}