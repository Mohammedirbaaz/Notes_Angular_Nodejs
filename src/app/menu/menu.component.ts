import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {Location} from '@angular/common'; 
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{
  constructor(private cookieService:CookieService, private location:Location){}

  public isLoggedIn: boolean = false;

  ngOnInit(): void {
    if(this.cookieService.check('token') && this.cookieService.get('token')!="")
      {
        this.isLoggedIn=true;
      }
  }

  logout():void{
    this.cookieService.delete('token');
    if(!this.cookieService.check('token'))
    {
        this.location.go("/login");
        window.location.reload();
    }
  }

  login():void{
    this.location.go("/login");
    window.location.reload();
  }
}
