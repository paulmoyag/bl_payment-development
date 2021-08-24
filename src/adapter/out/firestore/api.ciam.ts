import {Injectable} from "@nestjs/common";
import {OutPortDataRegistry} from "../../../application/interfaces/firestore.registry/out.port.data.registry";
import fetch from "node-fetch"
import {PaymentPreferencesDto} from "../../../domain/firestore/dto/paymentpreferences.dto";

@Injectable()
export class ApiCiam implements OutPortDataRegistry {

    async saveRegistryData(paymentPreferencesDto: PaymentPreferencesDto) {
        var res: number = null;
        await fetch(process.env.ENDPOINT_CIAM +'/paymentMethod/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentPreferencesDto),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                res = data;
            }).catch((error) => {
                console.error('Error:', error);
            });
        if(res){
            return true;
        }
        return false;
    }
}