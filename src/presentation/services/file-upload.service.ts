import fileUpload, { UploadedFile } from "express-fileupload";
import { CustomError } from "../../domain";
import { envs } from "../../config";


export class UploadFileService{
    static fileUpload = async (file: UploadedFile): Promise<string> => {
        if (!file) throw new Error('No tenemos ningun archivo')
        const cloudUrl = envs.API_IMG;
        const formdata = new FormData();
        formdata.append('upload_preset', 'cuni-img');
        const blob = new Blob([file.data], { type: file.mimetype });
        formdata.append('file',blob, file.name)
        try {
            const resp = await fetch(cloudUrl, {
                method: 'POST',
                body: formdata
            })
            // console.log(resp);
            if (!resp.ok) throw new Error('No se pudo subir imagen');
            const cloudResp = await resp.json()
            // console.log({cloudResp})
            return cloudResp.secure_url
        } catch (error) {
            console.log(error)
            throw new CustomError('Error al cargar archivo a la nube', 500)
        }
    }
}