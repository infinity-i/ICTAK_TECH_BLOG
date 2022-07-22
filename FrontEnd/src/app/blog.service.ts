import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(public http:HttpClient) { }

  newBlogs(blog:any){
    return this.http.post('http://localhost:3000/posts/savepost',{'blog':blog})
    .subscribe((data)=>console.log(data));
  }
}
