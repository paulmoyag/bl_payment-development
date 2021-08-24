import {RegistryPaymentOutPort} from "src/application/interfaces/payment.registry/out.port.payment.registry";
import {FinishRegistryRequest} from "../../../adapter/in/registry/dto/req.finishregistry";
import {OutPortDataRegistry} from "../../interfaces/firestore.registry/out.port.data.registry";
import {HttpException, HttpStatus} from "@nestjs/common";
import {PaymentPreferencesDto} from "../../../domain/firestore/dto/paymentpreferences.dto";
import {FinishRegistryResponse} from "../../../adapter/in/registry/dto/res.finishregistry";
import {FinishRegistryDto} from "../../../domain/firestore/dto/finish.registry.dto";
import {FinishRegistryMapper} from "../../../domain/firestore/mapper/finish.registry.mapper";
import {response} from "express";

export class FinishRegistryUsecase{
    constructor(private readonly registryOutPort:RegistryPaymentOutPort,
                private readonly registryDataPort:OutPortDataRegistry){}

    async finishPaymentMethodRegistry(dto: FinishRegistryRequest):Promise<FinishRegistryResponse> {
        let finishRegistryDto:FinishRegistryDto = await this.registryOutPort.finishPaymentMethodRegistry(dto);
        if(finishRegistryDto.responseCode=== 0){
        let paymentPreferencesDto:PaymentPreferencesDto = new PaymentPreferencesDto(
            dto.customerId,
            finishRegistryDto.transbankUser,
            finishRegistryDto.cardType,
            finishRegistryDto.cardNumber,
            finishRegistryDto.transbankUser,
            true)
        let result:boolean = await this.registryDataPort.saveRegistryData(paymentPreferencesDto);
        if(!result){
            throw new HttpException("Error al guardar el usuario", HttpStatus.NOT_IMPLEMENTED);
        }
        }
        let finishMapper:FinishRegistryMapper = new FinishRegistryMapper();
        return finishMapper.finishRegistryDtoToRes(finishRegistryDto);
    }

}