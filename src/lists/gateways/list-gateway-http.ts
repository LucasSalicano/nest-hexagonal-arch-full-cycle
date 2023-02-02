import { ListGatewayInterface } from './list-gateway-interface';
import { HttpService } from '@nestjs/axios';
import { Inject } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import List from '../entities/list.entity';

export class ListGatewayHttp implements ListGatewayInterface {
  constructor(
    @Inject(HttpService)
    private httpService: HttpService,
  ) {}

  async create(list: List): Promise<List> {
    await lastValueFrom(
      this.httpService.post('lists', {
        name: list.name,
      }),
    );
    return list;
  }

  async findAll(): Promise<List[]> {
    const { data } = await lastValueFrom(this.httpService.get<any[]>('lists'));
    return data.map(list => new List(list.name));
  }

  async findById(id: number): Promise<List> {
    const { data } = await lastValueFrom(this.httpService.get(`lists/${id}`));
    return new List(data.name, data.id);
  }

  async remove(id: number): Promise<void> {
    await lastValueFrom(this.httpService.delete(`lists/${id}`));
  }

  async updated(list: List, id: number): Promise<List> {
    const { data } = await lastValueFrom(
      this.httpService.put(`lists/${id}`, {
        name: list.name,
      }),
    );

    return new List(data.name, data.id);
  }
}
