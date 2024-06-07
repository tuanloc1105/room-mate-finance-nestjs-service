export class AppContext {
  private data: Map<string, any>;

  constructor() {
    this.data = new Map<string, any>();
  }

  set(key: string, value: any) {
    this.data.set(key, value);
  }

  get(key: string): any {
    return this.data.get(key);
  }

  remove(key: string): boolean {
    return this.data.delete(key);
  }

  setIfAbsent(key: string, value: any): boolean {
    if (this.data.has(key)) {
      return false;
    }
    this.data.set(key, value);
  }
}
