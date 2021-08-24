import {Module} from "@nestjs/common";
import {PayMethodController} from "../adapter/in/registry/pay-method.controller";
import { ConfigModule } from '@nestjs/config/dist/config.module';
import useCaseConfig from "./usecase.conf";
import { TotalDebtController } from "src/adapter/in/debt/totaldebt.controller";


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  })],
  controllers: [PayMethodController,TotalDebtController],
  providers: useCaseConfig
})
export class AppModule {}
