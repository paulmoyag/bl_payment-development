import {RegistryPaymentOutPort} from "src/application/interfaces/payment.registry/out.port.payment.registry";
import {DeletePaymentMethodRequest} from "../../../adapter/in/registry/dto/req.deleteregistry";
import {ResPaymentMethodDeleteTbkDto} from "../../../domain/payment-api/dto/res.payment.method.delete.tbk.dto";
import {DeletePaymentMethodResponse} from "../../../adapter/in/registry/dto/res.deleteregistry";

export class DeleteRegistryUsecase {
    constructor(private readonly registryPaymentOutPort: RegistryPaymentOutPort,) {
    }

    async deletePaymentMethodRegistry(dto: DeletePaymentMethodRequest): Promise<DeletePaymentMethodResponse> {
        if(dto.customerId === undefined){
            return new DeletePaymentMethodResponse(false, 400, "parameter customerId is required")
        }
        let resTbk: ResPaymentMethodDeleteTbkDto = await this.registryPaymentOutPort.deletePaymentMethodRegistry(dto);
        console.log(resTbk);
        if (resTbk.result === null || resTbk.result === undefined) {
            return new DeletePaymentMethodResponse(false, 400, "No se pudo eliminar medio de pago, intente más tarde");
        }
        if (resTbk.result === false) {
            return new DeletePaymentMethodResponse(false, resTbk.code, resTbk.message);
        }
        return new DeletePaymentMethodResponse(true, 200, "payment method deleted for customerId= " + dto.customerId);
    }
}