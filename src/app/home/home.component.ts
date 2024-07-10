import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { AppComponent } from '../app.component';
import { CommonModule } from '@angular/common';
// import {Compiler} from '@angular/compiler';
import axios from 'axios';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  public isLoggedIn:boolean=false;
  public title:String="";
  public notes:String="";
  public divs:Array<any>=[];
  public arr:Array<Object>=[];
  public colorarr:Array<string>=["salmon","coral","darkkhaki","olive","darkcyan"];

  constructor(private menuComponent: MenuComponent, private appComponent:AppComponent) {
    this.isLoggedIn=this.menuComponent.isLoggedIn;
  }
  
  
  ngOnInit(): void {
  this.divs=[{name:"irbaaz"},{name:"jack"},{name:"jobn"},{name:"sdf"},{name:"irerwbaaz"}];
    axios.get("http://localhost:3000/notes/getAll",{withCredentials:true}).then(async res=>{
      this.divs=await res.data;
      console.log(res.data);
    }).catch(err=>{
      console.log(err);
    })
    console.log(this.colorfunc());
  }

  onchangetitle(e:any) : void{
    this.title=e.target.value;   
  }
  onchangenotes(e:any){
    this.notes=e.target.value;
  }
  colorfunc():string{
    var ind=Math.floor(Math.random()*5);
    return this.colorarr[ind];
  }

  

  createnote(){
    let obj={
      title:this.title,
      notes:this.notes
    }
    console.log(obj)

    axios.post("http://localhost:3000/notes/add",obj,{withCredentials:true}).then(async res=>{
      await axios.get("http://localhost:3000/notes/getAll",{withCredentials:true}).then(async res=>{
        this.divs=await res.data;
      }).catch(err=>{
        console.log(err);
      })
    }).catch(err=>{
      console.log(err);
    })

  }

}
