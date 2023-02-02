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
export default class ListInCrmJob {
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

  @Process('list.removed')
  async removeList(job: Job) {
    console.log('process removed event...');
    const event = job.data;
    await this.listIntegrationGateway.remove(event.id);
  }

  @Process('list.updated')
  async updatedList(job: Job) {
    console.log('process updated event...');
    const event = job.data;
    await this.listIntegrationGateway.updated(event.list, event.list.id);
  }

  @OnQueueFailed({ name: 'list.created' })
  handleError(error: Error) {
    console.log('Queue failed...');
  }
}
