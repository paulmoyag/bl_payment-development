import {ApiProperty} from "@nestjs/swagger";

export class InitRegistryRequest{
    @ApiProperty()
    public username: string;
    @ApiProperty()
    public email:string;
    @ApiProperty()
    public responseUrl:string;

    /**
     * Constructor
     * @param email email of the user
     * @param username user full name
     * @param responseUrl the url where the transbank system will return
     */
    constructor(email:string, username:string, responseUrl:string) {
        this.email= email;
        this.username = username;
        this.responseUrl = responseUrl;
    }
}