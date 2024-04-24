export interface ConversationInterface<T> {
  create(id1: string, id2: string, name: string): Promise<T>;
  findOne(id: string): Promise<T | null>;
  findAll(id: string): Promise<T[]>;
  update(id: string, item: T): Promise<T>;
  delete(id: string): Promise<boolean>;
}
