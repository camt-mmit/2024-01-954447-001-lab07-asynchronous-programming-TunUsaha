import { Injectable } from '@angular/core';
import { Profile } from '../models';
import { count } from 'rxjs';

const keyName = 'profile-data';

@Injectable({
  providedIn: 'root'
})
export class ProfileDataService {

  async get(): Promise<Profile | null>{
    const jsonText = localStorage.getItem(keyName);
    return JSON.parse(jsonText ??'null');
  }

  async set(data: Profile): Promise<void>{
    const jsonText = JSON.stringify(data);
    localStorage.setItem(keyName,jsonText);
  }
}
