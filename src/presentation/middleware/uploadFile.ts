import { Request, Response, NextFunction } from "express";
import { UploadFileService } from "../services/file-upload.service";
import { UploadedFile } from "express-fileupload";


export class uploadFileMiddleware {
    static subirImagen = async (req: Request, res: Response, next: NextFunction) => {
        if (!req.files){
            next()
            return
        }
        const file = req.files.img_pregunta
        const fileResp = req.files.img_respuesta
        if (file){
            try{
                const imagen_url = await UploadFileService.fileUpload(file as UploadedFile)
                req.body.imagen_url = imagen_url
            }catch (error){
                return res.status(500).json({error: 'Error al subir imagen'})
            }
        }
        if (fileResp){
            try {
                const solucion_url = await UploadFileService.fileUpload(fileResp as UploadedFile)
                req.body.solucion_url = solucion_url
            } catch (error) {
                return res.status(500).json({error: 'Error al subir imagen'})
            }
        }
        next()
    }
}