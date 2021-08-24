import {FinishRegistryDto} from "../dto/finish.registry.dto";
import {FinishRegistryResponse} from "../../../adapter/in/registry/dto/res.finishregistry";

export class FinishRegistryMapper {
    async finishRegistryDtoToRes(objOld:FinishRegistryDto):Promise<FinishRegistryResponse>{
        var objNew: FinishRegistryResponse = new FinishRegistryResponse();
        objNew.message = objOld.message;
        objNew.authorizationCode = objOld.transbankUser;
        objNew.cardNumber = objOld.cardNumber;
        objNew.cardType = objOld.cardType;
        objNew.responseCode = objOld.responseCode;
        return objNew;
    }
}