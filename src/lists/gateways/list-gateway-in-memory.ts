import { ListGatewayInterface } from './list-gateway-interface';
import List from '../entities/list.entity';

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
    await this.items.find(item => item.id === id);
  }
}
