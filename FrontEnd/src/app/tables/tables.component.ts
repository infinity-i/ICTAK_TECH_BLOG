import { Component, OnInit } from '@angular/core';
import { BlogModel } from '../add-blog/add-blog.model';
import { BlogService } from '../blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  blogs:BlogModel[] | any;
  constructor(private blogService:BlogService,public router:Router) { }

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe((data) => {
      this.blogs = JSON.parse(JSON.stringify(data));
    })
  }

  onAccept(i:any){
    this.blogService.updateCategory(i);   
    window.location.reload()
  }

  Delete(id:any){
    this.blogService.deleteBlog(id)
      .subscribe((data) => {
        this.blogs = this.blogs.filter(p => p !== this.blogs);
        window.location.reload()
      })
  
  }

  showblog(i:any){
    localStorage.setItem("viewblog", i._id.toString());
    this.router.navigate(['home/viewblog']);
    // console.log("id = "+i._id)
  }

}
