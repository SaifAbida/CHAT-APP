export interface MessageInterface<T> {
  create(
    conversation_id: string,
    sender_id: string,
    content: string
  ): Promise<T>;
  findOne(id: string): Promise<T | null>;
  findAll(id: string): Promise<T[]>;
  update(id: string, item: T): Promise<T>;
  delete(id: string): Promise<boolean>;
}
