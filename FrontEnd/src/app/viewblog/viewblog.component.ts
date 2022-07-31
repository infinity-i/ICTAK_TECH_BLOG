import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { BlogModel } from '../add-blog/add-blog.model';
@Component({
  selector: 'app-viewblog',
  templateUrl: './viewblog.component.html',
  styleUrls: ['./viewblog.component.css']
})
export class ViewblogComponent implements OnInit {

  // blogdata : BlogModel[] | any;
  blogdata = new BlogModel('','','','','','','')
  // blogdata = {
  //   blogtitle:'',
  //   blogauthor:'',
  //   blogcontent:''
  // }

  constructor(private blogservice:BlogService,private router:Router) { }

  ngOnInit(): void {
    let blogid = localStorage.getItem('viewblog');
    console.log('data got with id'+blogid);
    this.blogservice.singleblog(blogid).subscribe((data)=>{
      this.blogdata=JSON.parse(JSON.stringify(data));

    })
  }

  backward(){

    localStorage.removeItem('viewblog')
    this.router.navigate(['home/blogs']);
    
    

  }

}
