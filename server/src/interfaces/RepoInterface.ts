export interface RepoInterface<T> {
  create(item: T): Promise<T>;
  findOne(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(id: string, item: T): Promise<T>;
  delete(id: string): Promise<boolean>;
}
