import { ListGatewayInterface } from './list-gateway-interface';
import List from '../entities/list.entity';
import { NotFoundException } from '@nestjs/common';

export class ListGatewayInMemory implements ListGatewayInterface {
  items: List[] = [];
  async create(list: List): Promise<List> {
    list.id = this.items.length + 1;
    this.items.push(list);
    return list;
  }

  async findAll(): Promise<List[]> {
    return this.items;
  }

  async findById(id: number): Promise<List> {
    return this.items.find(item => item.id === id);
  }

  async remove(id: number): Promise<void> {
    await this.items.find(item => item.id !== id);
  }

  async updated(list: List, id: number): Promise<List> {
    const listOld = this.items.find(item => item.id === id);

    if (!list) {
      throw new NotFoundException('List not found');
    }

    listOld.name = list.name;
    return listOld;
  }
}
