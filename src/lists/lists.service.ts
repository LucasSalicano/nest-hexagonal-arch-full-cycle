import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { HttpService } from '@nestjs/axios';
import List from './entities/list.entity';
import { ListGatewayInterface } from './gateways/list-gateway-interface';
import { EventEmitter } from 'events';
import { ListCreatedEvent } from './events/list-created.event';
import { ListRemovedEvent } from './events/list-removed.event';
import { ListUpdatedEvent } from './events/list-updated.event';

@Injectable()
export class ListsService {
  constructor(
    @Inject('ListPersistenceGateway')
    private listPersistenceGateway: ListGatewayInterface,
    private readonly httpService: HttpService,

    @Inject('EventEmitter')
    private eventEmitter: EventEmitter,
  ) {}

  async create(createListDto: CreateListDto) {
    const list = new List(createListDto.name);
    await this.listPersistenceGateway.create(list);
    this.eventEmitter.emit('list.created', new ListCreatedEvent(list));
    return list;
  }

  async findAll() {
    return await this.listPersistenceGateway.findAll();
  }

  async findOne(id: number) {
    return await this.listPersistenceGateway.findById(id);
  }

  async update(id: number, updateListDto: UpdateListDto) {
    const list = new List(updateListDto.name);
    await this.listPersistenceGateway.updated(list, id);
    list.id = id;
    this.eventEmitter.emit('list.updated', new ListUpdatedEvent(list));
    return list;
  }

  async remove(id: number) {
    await this.listPersistenceGateway.remove(id);
    this.eventEmitter.emit('list.removed', new ListRemovedEvent(id));
  }
}
