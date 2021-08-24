import {Body, Controller, Delete, HttpException, HttpStatus, Post, Res} from "@nestjs/common";
import {ApiBody, ApiResponse, ApiTags} from "@nestjs/swagger";
import { GetTotalDebtUsecaseInterface } from "src/application/interfaces/debt.gettotal/interface.gettotal.usecase";
import { GetTotalDebtRequest } from "./dto/req.gettotaldebt";
import { GetTotalDebtResponse } from "./dto/res.gettotaldebt";

@Controller('Debt')
@ApiTags('Debt')
export class TotalDebtController{
    constructor(public readonly usecase: GetTotalDebtUsecaseInterface) {
    }

    @ApiBody({type: GetTotalDebtRequest})
    @ApiResponse({status: 201, type: GetTotalDebtResponse})
    @Post('/getTotalDebt')
    async debtMethodGetTotal(@Body() dto: GetTotalDebtRequest): Promise<GetTotalDebtResponse> {
        let debtMethodGetTotal = await this.usecase.debtMethodGetTotal(dto);
        if (debtMethodGetTotal.code === 200) {
            return debtMethodGetTotal
        } else {
            throw new HttpException(debtMethodGetTotal.message, HttpStatus.BAD_REQUEST);
        }
    }
}