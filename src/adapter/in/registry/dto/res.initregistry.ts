import {ApiProperty} from "@nestjs/swagger";

export class InitRegistryResponse {
    @ApiProperty()
    public transbankWebUrl:string;
    @ApiProperty()
    public transbankToken:string;
    @ApiProperty()
    public message:string;

}