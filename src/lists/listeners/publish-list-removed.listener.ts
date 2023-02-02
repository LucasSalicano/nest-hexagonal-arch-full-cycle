import { Queue } from 'bull';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectQueue } from '@nestjs/bull';
import { ListRemovedEvent } from '../events/list-removed.event';

@Injectable()
export class PublishListRemovedListener {
  constructor(
    @InjectQueue('default')
    private queue: Queue,
  ) {}

  @OnEvent('list.removed')
  async handle(event: ListRemovedEvent) {
    await this.queue.add('list.removed', event);
  }
}
