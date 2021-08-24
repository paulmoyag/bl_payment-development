import {PaymentPreferencesDto} from "../../../domain/firestore/dto/paymentpreferences.dto";


export abstract class OutPortDataRegistry {
    abstract saveRegistryData(paymentPreferencesDto: PaymentPreferencesDto);
}