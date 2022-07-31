import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  router: any;
 

  constructor(public auth:AuthService) { }

  title:string="ICTAK"

  ngOnInit(): void {
  }
  logoutUser()
  {
    localStorage.removeItem('token')
    this.router.navigate(['welcome'])
  }

}
