import {InitRegistryRequest} from "../../../adapter/in/registry/dto/req.initregistry";
import {FinishRegistryRequest} from "../../../adapter/in/registry/dto/req.finishregistry";
import {DeletePaymentMethodRequest} from "../../../adapter/in/registry/dto/req.deleteregistry";
import {DeletePaymentMethodResponse} from "../../../adapter/in/registry/dto/res.deleteregistry";

export abstract class RegistryUsecaseInterface {
    abstract initPaymentMethodRegistry(dto:InitRegistryRequest);
    abstract finishPaymentMethodRegistry(finishRegistryRequest: FinishRegistryRequest);
    abstract deletePaymentMethodRegistry(deletePaymentMehthodRequest: DeletePaymentMethodRequest):Promise<DeletePaymentMethodResponse>;
}