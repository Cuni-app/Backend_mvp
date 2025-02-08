import { CategoriaRepository, FollowRepository, ItemRepository, PreguntaRepository, RespuestaRepository, ResultadoRepository, UserRepository } from "../../domain";
import { CategoriaRepositoryImpl, FollowRepositoryImpl, ItemRepositoryImpl, PreguntaRepositoryImpl, RespuestaRepositoryImpl, ResultadoRepositoryImpl, UserRepositoryImpl } from "../repository";
import { DIContainerDatasource } from "./datasourceContainer";

export class DIContainerRepository {
    private static instances: Map<string, any> = new Map(); //* map es como los diccionarios de Python

    static getCategoriaRepository(): CategoriaRepository{
        if(!this.instances.has("CategoriaRepository")){
            this.instances.set(
                "CategoriaRepository",
                new CategoriaRepositoryImpl(DIContainerDatasource.getCategoriaDatasource())
            )
        }
        return this.instances.get("CategoriaRepository")
    }

    static getFollowRepository(): FollowRepository{
        if(!this.instances.has("FollowRepository")){
            this.instances.set(
                "FollowRepository",
                new FollowRepositoryImpl(DIContainerDatasource.getFollowDatasource())
            )
        }
        return this.instances.get("FollowRepository")
    }

    static getItemRepository(): ItemRepository{
        if (!this.instances.has("ItemRepository")){
            this.instances.set(
                "ItemRepository",
                new ItemRepositoryImpl(DIContainerDatasource.getItemDatasource())
            )
        }
        return this.instances.get("ItemRepository")
    }

    static getPreguntaRepository(): PreguntaRepository{
        if (!this.instances.has("PreguntaRepository")){
            this.instances.set(
                "PreguntaRepository",
                new PreguntaRepositoryImpl(DIContainerDatasource.getPreguntaDatasource())
            )
        }
        return this.instances.get("PreguntaRepository")
    }

    static getRespuestaRepository(): RespuestaRepository{
        if (!this.instances.has("RespuestaRepository")){
            this.instances.set(
                "RespuestaRepository",
                new RespuestaRepositoryImpl(DIContainerDatasource.getRespuestaDatasource())
            )
        }
        return this.instances.get("RespuestaRepository")
    }

    static getResultadoRepository(): ResultadoRepository{
        if (!this.instances.has("ResultadoRepository")){
            this.instances.set(
                "ResultadoRepository",
                new ResultadoRepositoryImpl(DIContainerDatasource.getResultadoDatasource())
            )
        }
        return this.instances.get("ResultadoRepository")
    }

    static getUserRepository(): UserRepository{
        if (!this.instances.has("UserRepository")){
            this.instances.set(
                "UserRepository",
                new UserRepositoryImpl(DIContainerDatasource.getUserDatasource())
            )
        }
        return this.instances.get("UserRepository")
    }
}

