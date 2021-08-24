import {Body, Controller, Delete, HttpException, HttpStatus, Post, Res} from "@nestjs/common";
import {ApiBody, ApiResponse, ApiTags} from "@nestjs/swagger";
import {InitRegistryRequest} from "./dto/req.initregistry";
import {InitRegistryResponse} from "./dto/res.initregistry";
import {FinishRegistryRequest} from "./dto/req.finishregistry";
import {FinishRegistryResponse} from "./dto/res.finishregistry";
import {RegistryUsecaseInterface} from "../../../application/interfaces/payment.registry/interface.registry.usecase";
import {DeletePaymentMethodResponse} from "./dto/res.deleteregistry";
import {DeletePaymentMethodRequest} from "./dto/req.deleteregistry";
import {Response} from 'express';

@Controller('paymentMethod')
@ApiTags('paymentMethod')
export class PayMethodController {
    constructor(public readonly usecase: RegistryUsecaseInterface) {
    }

    @ApiBody({type: InitRegistryRequest})
    @ApiResponse({status: 201, type: InitRegistryResponse})
    @Post('/initRegistry')
    async initPaymentMethodRegistry(@Body() dto: InitRegistryRequest): Promise<InitRegistryResponse> {
        let initPaymentMethodRegistry = await this.usecase.initPaymentMethodRegistry(dto);
        if (initPaymentMethodRegistry.message === "Payment method registry initialized") {
            return initPaymentMethodRegistry
        } else {
            throw new HttpException(initPaymentMethodRegistry.message, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiBody({type: FinishRegistryRequest})
    @ApiResponse({status: 201, type: FinishRegistryResponse})
    @ApiResponse({status: 408, description: "Timeout exceeded"})
    @ApiResponse({status: 422, description: "Invalid token"})
    @Post('/finishRegistry')
    async finishPaymentMethodRegistry(@Body() dto: FinishRegistryRequest): Promise<FinishRegistryResponse> {
        let finishPaymentRegistryResponse = await this.usecase.finishPaymentMethodRegistry(dto);
        if (finishPaymentRegistryResponse.message === "Payment method registered"
            || finishPaymentRegistryResponse.responseCode !== undefined) {
            return finishPaymentRegistryResponse;
        } else if (finishPaymentRegistryResponse.message === "Timeout exceeded for method finishInscription") {
            throw new HttpException(finishPaymentRegistryResponse.message, HttpStatus.REQUEST_TIMEOUT)
        } else if (finishPaymentRegistryResponse.message === "Invalid token") {
            throw new HttpException(finishPaymentRegistryResponse.message, HttpStatus.UNPROCESSABLE_ENTITY)
        } else {
            throw new HttpException(finishPaymentRegistryResponse.message, HttpStatus.BAD_REQUEST);
        }

    }

    @ApiBody({type: DeletePaymentMethodRequest})
    @ApiResponse({status: 201, type: DeletePaymentMethodResponse})
    @ApiResponse({status: 409, description: "User not found on database or transbank or User has active debt"})
    @ApiResponse({status: 400, description: "No se pudo eliminar medio de pago, intente más tarde"})
    @Delete()
    async deletePaymentMethodRegistry(@Body() dto: DeletePaymentMethodRequest, @Res() response: Response) {
        try {
            let promise: DeletePaymentMethodResponse = await this.usecase.deletePaymentMethodRegistry(dto);
            if (promise.code === 200) {
                response.status(201)
                response.send(promise)
            } else {
                response.status(promise.code)
                response.send(promise.message)
            }
        } catch (error) {
            throw new HttpException("No se pudo eliminar medio de pago, intente más tarde", HttpStatus.BAD_REQUEST)
        }
    }
}