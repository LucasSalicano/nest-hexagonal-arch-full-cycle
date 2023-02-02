import List from '../entities/list.entity';

export class ListUpdatedEvent {
  constructor(public list: List) {}
}
