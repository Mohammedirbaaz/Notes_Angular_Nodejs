import { Component } from '@angular/core';
import axios from 'axios';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports:[MenuComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email:String="";
  password:String="";
  cpassword:String="";
  phno:String="";
  name:String="";

  clickedme(e:any):void{
    e.preventDefault();
    console.log(this.email+","+this.password);

    let obj={
      email :this.email,
      password :this.password,
      phno : this.phno,
      name : this.name,
    }

    axios.post('http://localhost:3000/user/register',{obj:obj}).then(res=>{
      alert("pushed!!")
      console.log(res.data);
    }).catch(err=>{
      console.log(err);
    })

  }

  onChange(e:any){
    if(e.target.name=="email") this.email=e.target.value;
    if(e.target.name=="password") this.password=e.target.value;
    if(e.target.name=="confirmpassword") this.cpassword=e.target.value;
    if(e.target.name=="phno") this.phno=e.target.value;
    if(e.target.name=="name") this.name=e.target.value;
  }






}
