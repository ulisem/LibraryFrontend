import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public storage: any;

  constructor() {
    this.storage = localStorage;
  }

  get(key: string) {
    return this.storage.getItem(key)
  }

  set(key: string, value: any) {
    return this.storage.setItem(key, value)
  }

  clear() {
    this.storage.clear();
  }

  remove(key: string) {
    this.storage.removeItem(key);
  }
}
