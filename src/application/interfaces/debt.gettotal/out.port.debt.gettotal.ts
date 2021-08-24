import { GetTotalDebtRequest } from "src/adapter/in/debt/dto/req.gettotaldebt";

export abstract class GetTotalDebtOutPort {
    abstract debtMethodGetTotal(getTotalDebtRequest: GetTotalDebtRequest);
}