import {FinishRegistryRequest} from "../../../adapter/in/registry/dto/req.finishregistry";
import {FinishRegistryUsecase} from "./finish.registry.usecase";
import {InitRegistryUsecase} from "./init.registry.usecase";
import {InitRegistryRequest} from "../../../adapter/in/registry/dto/req.initregistry";
import {RegistryUsecaseInterface} from "../../interfaces/payment.registry/interface.registry.usecase";
import {DeleteRegistryUsecase} from "./delete.registry.usecase";
import {DeletePaymentMethodRequest} from "../../../adapter/in/registry/dto/req.deleteregistry";
import {DeletePaymentMethodResponse} from "../../../adapter/in/registry/dto/res.deleteregistry";

export class RegistryFacade implements RegistryUsecaseInterface {
  constructor(
    private readonly finishRegistryUsecase: FinishRegistryUsecase,
    private readonly initRegistryUsecase: InitRegistryUsecase,
    private readonly deleteRegistryUsecase: DeleteRegistryUsecase,
  ) {}

  async initPaymentMethodRegistry(initRegistryRequest: InitRegistryRequest) {
    return this.initRegistryUsecase.initPaymentMethodRegistry(initRegistryRequest);
  }
  async finishPaymentMethodRegistry(finishRegistryRequest: FinishRegistryRequest) {
    return this.finishRegistryUsecase.finishPaymentMethodRegistry(finishRegistryRequest);
  }
  async deletePaymentMethodRegistry(deleteRequest: DeletePaymentMethodRequest):Promise<DeletePaymentMethodResponse> {
    return this.deleteRegistryUsecase.deletePaymentMethodRegistry(deleteRequest);
  }
}
