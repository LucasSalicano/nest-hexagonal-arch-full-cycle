import {
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { ListGatewayInterface } from '../gateways/list-gateway-interface';
import { Inject } from '@nestjs/common';
import { Error } from 'sequelize';

@Processor()
export default class CreateListInCrmJob {
  constructor(
    @Inject('ListIntegrationGateway')
    private listIntegrationGateway: ListGatewayInterface,
  ) {}
  @Process('list.created')
  async handle(job: Job) {
    console.log('process event...');
    const event = job.data;
    await this.listIntegrationGateway.create(event.list);
  }

  @OnQueueFailed({ name: 'list.created' })
  handleError(error: Error) {
    console.log('Queue failed...');
  }
}
