import { EmailService } from "../../presentation/services/email.service";
import { envs } from "../../config";
import { CategoriaDatasource, FollowDatasource, ItemDatasource, PreguntaDatasource, RespuestaDatasource, ResultadoDatasource, UserDatasource } from "../../domain";
import { CategoriaDatasourceImpl, FollowDatasourceImpl, ItemDatasourceImpl, PreguntaDatasourceImpl, RespuestaDatasourceImpl, ResultadoDatasourceImpl, UserDatasourceImpl } from "../datasource";

export class DIContainerDatasource {
    private static instances: Map<string, any> = new Map(); //* map es como los diccionarios de Python
    static getEmailService(): EmailService {
        if (!this.instances.has("EmailService")) {
            this.instances.set(
                "EmailService",
                new EmailService(
                    envs.MAILER_SERVICE,
                    envs.MAILER_EMAIL,
                    envs.MAILER_SECRET_KEY,
                    envs.SEND_EMAIL
                )
            );
        }
        return this.instances.get("EmailService")
    }

    static getUserDatasource(): UserDatasource {
        if (!this.instances.has("UserDatasource")){
            this.instances.set(
                "UserDatasource",
                new UserDatasourceImpl(this.getEmailService())
            )
        }
        return this.instances.get("UserDatasource")
    }

    static getCategoriaDatasource(): CategoriaDatasource{
        if (!this.instances.has("CategoriaDatasource")){
            this.instances.set(
                "CategoriaDatasource",
                new CategoriaDatasourceImpl()
            )
        }
        return this.instances.get("CategoriaDatasource")
    }

    static getFollowDatasource(): FollowDatasource{
        if (!this.instances.has("FollowDatasource")){
            this.instances.set(
                "FollowDatasource",
                new FollowDatasourceImpl(this.getUserDatasource())
            )
        }
        return this.instances.get("FollowDatasource")
    }

    static getItemDatasource(): ItemDatasource{
        if (!this.instances.has("ItemDatasource")){
            this.instances.set(
                "ItemDatasource",
                new ItemDatasourceImpl(this.getUserDatasource())
            )
        }
        return this.instances.get("ItemDatasource")
    }
    static getPreguntaDatasource(): PreguntaDatasource{
        if (!this.instances.has("PreguntaDatasource")){
            this.instances.set(
                "PreguntaDatasource",
                new PreguntaDatasourceImpl()
            )
        }
        return this.instances.get("PreguntaDatasource")
    }

    static getRespuestaDatasource(): RespuestaDatasource{
        if(!this.instances.has("RespuestaDatasource")){
            this.instances.set(
                "RespuestaDatasource",
                new RespuestaDatasourceImpl(this.getPreguntaDatasource())
            )
        }
        return this.instances.get("RespuestaDatasource")
    }

    static getResultadoDatasource(): ResultadoDatasource{
        if (!this.instances.has("ResultadoDatasource")){
            this.instances.set(
                "ResultadoDatasource",
                new ResultadoDatasourceImpl(this.getUserDatasource(), this.getCategoriaDatasource())
            )
        }
        return this.instances.get("ResultadoDatasource")
    }

    

}
