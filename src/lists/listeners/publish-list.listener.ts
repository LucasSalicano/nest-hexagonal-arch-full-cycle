import { Queue } from 'bull';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectQueue, OnQueueCompleted } from '@nestjs/bull';
import { ListCreatedEvent } from '../events/list-created.event';
import { ListRemovedEvent } from '../events/list-removed.event';
import { ListUpdatedEvent } from '../events/list-updated.event';

@Injectable()
export class PublishListListener {
  constructor(
    @InjectQueue('default')
    private queue: Queue,
  ) {}

  @OnEvent('list.created')
  async handle(event: ListCreatedEvent) {
    await this.queue.add('list.created', event);
  }

  @OnEvent('list.removed')
  async remove(event: ListRemovedEvent) {
    await this.queue.add('list.removed', event);
  }

  @OnEvent('list.updated')
  async update(event: ListUpdatedEvent) {
    await this.queue.add('list.updated', event);
  }
}
