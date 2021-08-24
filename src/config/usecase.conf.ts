import {Provider} from '@nestjs/common';
import {RegistryPaymentOutPort} from "../application/interfaces/payment.registry/out.port.payment.registry";
import {RegistryUsecaseInterface} from "../application/interfaces/payment.registry/interface.registry.usecase";
import {FinishRegistryUsecase} from "../application/usercase/registry/finish.registry.usecase";
import {InitRegistryUsecase} from "../application/usercase/registry/init.registry.usecase";
import {RegistryFacade} from "../application/usercase/registry/registry.facade";
import {ApiPayment} from "../adapter/out/payment/api.payment";
import {OutPortDataRegistry} from "../application/interfaces/firestore.registry/out.port.data.registry";
import {ApiCiam} from "../adapter/out/firestore/api.ciam";
import {DeleteRegistryUsecase} from "../application/usercase/registry/delete.registry.usecase";
import { ApiDebt } from 'src/adapter/out/debt/api.debt';
import { GetTotalDebtUsecase } from 'src/application/usercase/debt/get.totaldebt.usecase';
import { GetTotalDebtOutPort } from 'src/application/interfaces/debt.gettotal/out.port.debt.gettotal';
import { GetTotalDebtUsecaseInterface } from 'src/application/interfaces/debt.gettotal/interface.gettotal.usecase';

const useCaseConfig: Provider[] = [
    {
        provide: RegistryUsecaseInterface,
        inject: [
            FinishRegistryUsecase,
            InitRegistryUsecase,
            DeleteRegistryUsecase,
        ],
        useFactory: (
            finishRegistryUsecase: FinishRegistryUsecase,
            initRegistryUsecase: InitRegistryUsecase,
            deleteRegistryUsecase:DeleteRegistryUsecase,
        ) =>
            new RegistryFacade(
                finishRegistryUsecase,
                initRegistryUsecase,
                deleteRegistryUsecase
            ),
    },
    {
        provide: FinishRegistryUsecase,
        inject: [RegistryPaymentOutPort, OutPortDataRegistry],
        useFactory: (registryOutPort: RegistryPaymentOutPort, outPortDataRegistry:OutPortDataRegistry) =>
            new FinishRegistryUsecase(registryOutPort,outPortDataRegistry),
    },
    {
        provide: DeleteRegistryUsecase,
        inject: [RegistryPaymentOutPort],
        useFactory: (registryOutPort: RegistryPaymentOutPort) =>
            new DeleteRegistryUsecase(registryOutPort),
    },
    {
        provide: RegistryPaymentOutPort,
        useClass: ApiPayment
    },
    {
        provide: OutPortDataRegistry,
        useClass: ApiCiam
    },
    {
        provide: InitRegistryUsecase,
        inject: [RegistryPaymentOutPort],
        useFactory: (registryOutPort: RegistryPaymentOutPort) =>
            new InitRegistryUsecase(registryOutPort),
    },
    {
        provide: GetTotalDebtUsecaseInterface,
        inject: [GetTotalDebtOutPort],
        useFactory: (getTotalDebtOutPort: GetTotalDebtOutPort) =>
            new GetTotalDebtUsecase(getTotalDebtOutPort),
    },
    ApiPayment,
    ApiCiam,
    ApiDebt,
];

export default useCaseConfig;
