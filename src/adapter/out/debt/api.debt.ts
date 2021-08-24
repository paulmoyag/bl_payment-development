import {Injectable} from "@nestjs/common";
import fetch from "node-fetch"
import { GetTotalDebtRequest } from "src/adapter/in/debt/dto/req.gettotaldebt";
import { GetTotalDebtOutPort } from "src/application/interfaces/debt.gettotal/out.port.debt.gettotal";

@Injectable()
export class ApiDebt implements GetTotalDebtOutPort {

    async debtMethodGetTotal(getTotalDebtRequest: GetTotalDebtRequest) {
        var res: number = null;
        await fetch(process.env.ENDPOINT_PARKING +'/user/getTotalDebt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(getTotalDebtRequest),
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