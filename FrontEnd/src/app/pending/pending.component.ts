import { Component, OnInit } from '@angular/core';
import { BlogModel } from '../add-blog/add-blog.model';
import { BlogService } from '../blog.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {
  blogs:BlogModel[] | any;
  constructor(private blogService:BlogService,public router:Router) { }

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe((data) => {
      this.blogs = JSON.parse(JSON.stringify(data));
    })
  }

 

}
