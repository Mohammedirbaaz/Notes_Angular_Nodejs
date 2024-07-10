// login.component.ts
import { Component, OnInit } from '@angular/core';
import axios from 'axios'
import { MenuComponent } from '../menu/menu.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[MenuComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private cookieService:CookieService){}
  email:String="";
  password:String="";

  clickedme(e:any):void{
    e.preventDefault();
    console.log(this.email+","+this.password);

    let obj={
      email :this.email,
      password :this.password
    }

    axios.post('http://localhost:3000/user/login',obj, {
      withCredentials: true
  }).then(res=>{
    console.log(res.data);
      if(res.data==true){
        window.location.href="/home";
      }
    }).catch(err=>{
      console.log(err);
    })
  }

  ngOnInit(): void {
    const cookieval=this.cookieService.get('token');
    if(cookieval!="")
    {
      window.location.href="/home";
    }
  }

  onChange(e:any){
    
    if(e.target.name=="email") this.email=e.target.value;
    if(e.target.name=="password") this.password=e.target.value;
  }


}
