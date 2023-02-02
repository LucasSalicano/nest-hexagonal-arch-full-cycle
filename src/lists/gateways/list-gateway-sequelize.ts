import { ListGatewayInterface } from './list-gateway-interface';
import List from '../entities/list.entity';
import { ListModel } from '../entities/list.model';

import { InjectModel } from '@nestjs/sequelize';
import { NotFoundException } from '@nestjs/common';

export class ListGatewaySequelize implements ListGatewayInterface {
  constructor(
    @InjectModel(ListModel)
    private listModel: typeof ListModel,
  ) {}

  async create(list: List): Promise<List> {
    const newList = await this.listModel.create(list);
    list.id = newList.id;
    return list;
  }

  async findAll(): Promise<List[]> {
    const listsModels = await this.listModel.findAll();
    return listsModels.map(listModel => new List(listModel.name, listModel.id));
  }

  async findById(id: number): Promise<List> {
    const list = await this.listModel.findByPk(id);
    return new List(list.name, list.id);
  }

  async remove(id: number): Promise<void> {
    const list = await this.listModel.findByPk(id);

    if (!list) {
      throw new NotFoundException('List not found');
    }

    await list.destroy();
  }
}
