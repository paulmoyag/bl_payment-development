import {RegistryPaymentOutPort} from "src/application/interfaces/payment.registry/out.port.payment.registry";
import {InitRegistryRequest} from "../../../adapter/in/registry/dto/req.initregistry";
import {InitRegistryResponse} from "../../../adapter/in/registry/dto/res.initregistry";

export class InitRegistryUsecase{
    constructor(private readonly objPortOut:RegistryPaymentOutPort){}

    async initPaymentMethodRegistry(dto:InitRegistryRequest):Promise<InitRegistryResponse> {
        return await this.objPortOut.initPaymentMethodRegistry(dto);
    }

}