import {ApiProperty} from "@nestjs/swagger";

export class FinishRegistryResponse {
    @ApiProperty()
    public responseCode:number;
    @ApiProperty()
    public cardType:string;
    @ApiProperty()
    public cardNumber:string;
    @ApiProperty()
    public authorizationCode:string;
    @ApiProperty()
    public message:string;
}