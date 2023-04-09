import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';

@Module({
  imports:[],
  providers: [AwsService],
  controllers: []
})
export class AwsModule {}
