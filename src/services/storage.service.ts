export class BrowserStorageService<T extends Record<string | number, unknown>> {
  private readonly STORAGE_NAME;
  readonly storage: T;

  constructor(name: string) {
    this.STORAGE_NAME = name;
    // this.storage = JSON.parse(localStorage.getItem(this.STORAGE_NAME) || '{}');
    this.storage = new Proxy(JSON.parse(localStorage.getItem(this.STORAGE_NAME) || '{}'), {
      set: (...args) => {
        const updated = Reflect.set(...args);
        if (updated) this.update();
        return updated;
      }
    });
  }

  // set<K extends keyof T>(key: K, value: T[K]) {
  //   this.storage[key] = value;
  //   this.update();
  // }

  update() {
    localStorage.setItem(this.STORAGE_NAME, JSON.stringify(this.storage));
  }
}