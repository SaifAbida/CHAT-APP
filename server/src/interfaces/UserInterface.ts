
export interface UserInterface<T> {
  create(item: T): Promise<T>;
  findOne(id: string): Promise<T | null>;
  findByUsername(username: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(id: string, item: T): Promise<T>;
  save(item:T): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}
