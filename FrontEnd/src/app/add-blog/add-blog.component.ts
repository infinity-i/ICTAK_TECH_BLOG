import { BlogModel } from './add-blog.model';
import { Component, OnInit } from '@angular/core';
import {NgToastService} from 'ng-angular-popup'
import { BlogService } from '../blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css'] 
})
export class AddBlogComponent implements OnInit {
  newBlog = new BlogModel("","","","","","","");
  constructor(private toast:NgToastService, public blogService: BlogService, public router:Router) { }

  ngOnInit(): void {
  }

  AddBlog(){
    // showSuccess() {
      // alert('success')
      this.blogService.newBlogs(this.newBlog);
      this.toast.success({detail:"SUCCESS",summary:'Blog will publish when admin approved it',duration:6000});
      this.router.navigate(['/home']);
    // }

  }
}
