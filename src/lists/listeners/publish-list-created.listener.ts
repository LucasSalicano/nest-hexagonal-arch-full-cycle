import { Queue } from 'bull';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectQueue, OnQueueCompleted } from '@nestjs/bull';
import { ListCreatedEvent } from '../events/list-created.event';

@Injectable()
export class PublishListCreatedListener {
  constructor(
    @InjectQueue('default')
    private queue: Queue,
  ) {}

  @OnEvent('list.created')
  async handle(event: ListCreatedEvent) {
    await this.queue.add('list.created', event);
  }
}
