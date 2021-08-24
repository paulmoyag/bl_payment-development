import { GetTotalDebtRequest } from "src/adapter/in/debt/dto/req.gettotaldebt";
import { GetTotalDebtUsecaseInterface } from "src/application/interfaces/debt.gettotal/interface.gettotal.usecase";
import { GetTotalDebtUsecase } from "./get.totaldebt.usecase";

export class GetTotalFacade implements GetTotalDebtUsecaseInterface {
    constructor(
      private readonly getTotalDebtUseCase: GetTotalDebtUsecase,
    ) {}

    async debtMethodGetTotal(getTotalDebtRequest: GetTotalDebtRequest) {
        return this.getTotalDebtUseCase.debtMethodGetTotal(getTotalDebtRequest);
    }
  }