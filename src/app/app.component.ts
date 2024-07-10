import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HomeComponent} from '../app/home/home.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HomeComponent],
  providers:[CookieService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'foodpanda'; 
}
