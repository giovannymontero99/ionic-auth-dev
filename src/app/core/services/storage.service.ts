import { inject, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly _storage = inject(Storage);
  private readonly storagePromise = this._storage.create();


  get(key: string) {
    return window.localStorage.getItem(key);
  }

  async set(key: string, value: any): Promise<any> {
    return window.localStorage.setItem(key,value);
  }

  async getToken(): Promise<unknown>{
    return ;
  }

}
