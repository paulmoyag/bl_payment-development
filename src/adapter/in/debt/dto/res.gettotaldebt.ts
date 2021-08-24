import {ApiProperty} from "@nestjs/swagger";

export class GetTotalDebtResponse{

    @ApiProperty
    public code: number;
    @ApiProperty
    public message: string;

    /***
     * @constructor 
     * @param code is the code of the response
     * @param message is the message of the api
     */

    constructor(code:number, message:string,){
        this.code = code;
        this.message = message
    }
}