import {ApiProperty} from "@nestjs/swagger";

export class FinishRegistryRequest{
    @ApiProperty()
    public tbkToken: string;
    @ApiProperty()
    public customerId: string;

    /**
     * Constructor
     * @param tbkToken the token that was returned in the init method
     * @param customerId the id of the customer in the inscription
     */
    constructor(tbkToken:string, customerId:string) {
        this.tbkToken= tbkToken;
        this.customerId=customerId;
    }
}