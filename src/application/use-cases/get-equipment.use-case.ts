export class GetEquipmentUseCase {
  async execute(query: any): Promise<any> {
    // Temporary implementation
    return {
      data: [],
      pagination: {
        page: query.page || 1,
        limit: query.limit || 10,
        total: 0,
        pages: 0
      }
    };
  }
}