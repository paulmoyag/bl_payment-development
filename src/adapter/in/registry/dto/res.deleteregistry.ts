import {ApiProperty} from "@nestjs/swagger";

export class DeletePaymentMethodResponse{
    @ApiProperty()
    public deletedOnDatabase: boolean;
    @ApiProperty()
    public code: number;
    @ApiProperty()
    public message: string;

    /**
     * Constructor
     * @param deletedOnDatabase
     * @param code
     * @param message
     */

    constructor(deletedOnDatabase: boolean, code: number, message: string) {
        this.deletedOnDatabase = deletedOnDatabase;
        this.code = code;
        this.message = message;
    }
}