import {InitRegistryRequest} from "../../../adapter/in/registry/dto/req.initregistry";
import {FinishRegistryRequest} from "../../../adapter/in/registry/dto/req.finishregistry";
import {ResPaymentMethodDeleteTbkDto} from "../../../domain/payment-api/dto/res.payment.method.delete.tbk.dto";
import {DeletePaymentMethodRequest} from "../../../adapter/in/registry/dto/req.deleteregistry";


export abstract class RegistryPaymentOutPort {
    abstract finishPaymentMethodRegistry(finishRegistryRequest: FinishRegistryRequest);
    abstract  initPaymentMethodRegistry(objInitRegistry: InitRegistryRequest);
    abstract  deletePaymentMethodRegistry(deleteRequest: DeletePaymentMethodRequest):Promise<ResPaymentMethodDeleteTbkDto>;
}