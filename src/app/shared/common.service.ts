import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private titleSerivce: Title, private router: Router) { }
  navigateToLink(link: string) {
    this.router.navigate([link]);
  }
  setTitle(title: string) {
    this.titleSerivce.setTitle(title);
  }
}
