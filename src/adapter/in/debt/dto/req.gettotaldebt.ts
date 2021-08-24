import {ApiProperty} from "@nestjs/swagger";

export class GetTotalDebtRequest{

    @ApiProperty
    public userId: string;
    @ApiProperty
    public numberplate: string;
    @ApiProperty
    public ticketNumber: number;


    /***
     * @constructor 
     * @param userId is the Id of User in Xparc
     * @param numberplate is the car's patent plate
     * @param ticketNumber is the ticket number of car entry 
     */

    constructor(userId:string, numberplate:string, ticketNumber:number){
        this.userId = userId;
        this.numberplate = numberplate;
        this.ticketNumber = ticketNumber;
    }
}