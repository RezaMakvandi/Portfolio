import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }
  target: BehaviorSubject<string> = new BehaviorSubject<string>('');

  
}
