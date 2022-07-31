import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(public http:HttpClient) { }

  newBlogs(item:any){
    return this.http.post('http://localhost:3000/posts/savepost', { item })
    .subscribe((data)=>console.log(data));
  }

  getBlogs(){
    return this.http.get('http://localhost:3000/posts');
  }

  singleblog(id:any){
    return this.http.get('http://localhost:3000/singleblog/'+id)
    
    
  }
}

