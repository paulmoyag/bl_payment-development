import {ApiProperty} from "@nestjs/swagger";

export class DeletePaymentMethodRequest{
    @ApiProperty()
    public customerId: string;

    /**
     * Constructor
     * @param customerId the id of the customer in the inscription
     */
    constructor(customerId:string) {
        this.customerId=customerId;
    }
}