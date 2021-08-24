import {Injectable} from "@nestjs/common";
import {InitRegistryRequest} from "../../in/registry/dto/req.initregistry";
import {RegistryPaymentOutPort} from "../../../application/interfaces/payment.registry/out.port.payment.registry";
import fetch from "node-fetch"
import {InitRegistryResponse} from "../../in/registry/dto/res.initregistry";
import {FinishRegistryRequest} from "../../in/registry/dto/req.finishregistry";
import {FinishRegistryResponse} from "../../in/registry/dto/res.finishregistry";
import {ResPaymentMethodDeleteTbkDto} from "../../../domain/payment-api/dto/res.payment.method.delete.tbk.dto";
import {DeletePaymentMethodRequest} from "../../in/registry/dto/req.deleteregistry";

@Injectable()
export class ApiPayment implements RegistryPaymentOutPort {

    async initPaymentMethodRegistry(objInitRegistry: InitRegistryRequest) {
        var res: InitRegistryResponse = new InitRegistryResponse();
        var url= process.env.ENDPOINT_PAYMENT + '/paymentMethodInscription';
        await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(objInitRegistry),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.token === undefined) {
                    res.message = data.message
                } else {
                    res.transbankWebUrl = data.transbankWebUrl + "?TBK_TOKEN=" + data.token
                    res.transbankToken = data.token
                    res.message="Payment method registry initialized"
                }
            }).catch((error) => {
                console.error('Error:', error);
            });
        return res;
    }

    async finishPaymentMethodRegistry(finishRegistryRequest: FinishRegistryRequest) {
        var res: FinishRegistryResponse = new FinishRegistryResponse();
        await fetch(process.env.ENDPOINT_PAYMENT+ '/paymentMethodConfirmation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(finishRegistryRequest),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                res = data
                if (data.responseCode === -96)
                {
                    res.message = 'Payment method registry not initialized';
                }
                else if (data.responseCode === 0) {
                    res.message = "Payment method registered"
                }
            }).catch((error) => {
                console.error('Error:', error);
            });
        return res;
    }

    async deletePaymentMethodRegistry(deleteRequest: DeletePaymentMethodRequest):Promise<ResPaymentMethodDeleteTbkDto> {
        var res: ResPaymentMethodDeleteTbkDto = new ResPaymentMethodDeleteTbkDto();
        await fetch(process.env.ENDPOINT_PAYMENT+ '/paymentMethodDelete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(deleteRequest),
            }
        )
            .then((response)=>
                response.json()
                    .then(data => {
                        res = data
                        res.message = data.message
                        res.code = response.status
                    }))
            .catch((error) => {
                console.error('Error:', error);
            });
        return res;
    }
}