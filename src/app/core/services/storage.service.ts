import { inject, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly _storage = inject(Storage);
  private readonly storagePromise = this._storage.create();


  async get(key: string): Promise<any> {
    return (await this.storagePromise).get(key);
  }

  async set(key: string, value: any): Promise<any> {
    return (await this.storagePromise).set(key, value);
  }

  async getToken(): Promise<unknown>{
    return (await this.storagePromise).get('token');
  }

}
