import { GetTotalDebtRequest } from "src/adapter/in/debt/dto/req.gettotaldebt";

export abstract class GetTotalDebtUsecaseInterface {
    abstract debtMethodGetTotal(dto:GetTotalDebtRequest);
}