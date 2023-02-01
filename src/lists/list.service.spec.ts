import { ListsService } from './lists.service';
import { ListModel } from './entities/list.model';
import { ListGatewayInterface } from './gateways/list-gateway-interface';
import { ListGatewayInMemory } from './gateways/list-gateway-in-memory';
import List from './entities/list.entity';

const mockListModel = {
  create: jest
    .fn()
    .mockReturnValue(Promise.resolve(new ListModel({ name: 'list' }))),
};

const mockHttpService = {
  post: jest.fn(),
};

describe('ListsService', () => {
  let listPersistenceGateway: ListGatewayInterface;
  let listIntegrationGateway: ListGatewayInMemory;

  beforeEach(() => {
    listPersistenceGateway = new ListGatewayInMemory();
    listIntegrationGateway = new ListGatewayInMemory();
  });

  it('should return an list', async function () {
    const list = await listPersistenceGateway.create(new List('list'));
    expect(list).toEqual([list]);
  });
});
