import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { AboutMe } from '../models/about-me';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http:HttpClient) { }

}
