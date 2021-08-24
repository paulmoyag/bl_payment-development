import { GetTotalDebtRequest } from "src/adapter/in/debt/dto/req.gettotaldebt";
import { GetTotalDebtResponse } from "src/adapter/in/debt/dto/res.gettotaldebt";
import { GetTotalDebtOutPort } from "src/application/interfaces/debt.gettotal/out.port.debt.gettotal";

export class GetTotalDebtUsecase {
    constructor(private readonly getTotalDebtOutPort: GetTotalDebtOutPort,) {
    }

    async debtMethodGetTotal(dto: GetTotalDebtRequest): Promise<GetTotalDebtResponse> {
        if(dto.userId === undefined){
            return new GetTotalDebtResponse(400, "parameter userId is required")
        }
        let res: GetTotalDebtResponse = await this.getTotalDebtOutPort.debtMethodGetTotal(dto);
        console.log(res);
        if (res.code === null || res.code === undefined) {
            return new GetTotalDebtResponse( 400, "can't get total debt, please try later");
        }
        if (res.message === "") {
            return new GetTotalDebtResponse( res.code, res.message);
        }
        return new GetTotalDebtResponse(200, "payment method deleted for customerId= " + dto.userId);
    }
}