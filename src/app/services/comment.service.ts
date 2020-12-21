import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  url: String;
  constructor(private _http: HttpClient)
  {
    this.url = global.url;
  }

  saveComment(comment: any , token: any, topicID:any): Observable<any> 
  {
    let params = JSON.stringify(comment);

    let headers = new HttpHeaders().set('Content-Type','application/json')
                                   .set('Authorization', token);

    return this._http.post(`${this.url}/comment/topic/${topicID}`, params,{headers});
  }

  editarComment(topic: any , token: any, ide:any): Observable<any> 
  {
    let params = JSON.stringify(topic);

    let headers = new HttpHeaders().set('Content-Type','application/json')
                                   .set('Authorization', token);

    return this._http.put(`${this.url}/comment/${ide}`, params,{headers});
  }

  eliminaComment(TopicId: any,CommentId: any, token:any): Observable<any> 
  {

    let headers = new HttpHeaders().set('Content-Type','application/json')
                                   .set('Authorization', token);
                                   
    return this._http.delete(`${this.url}/comment/${TopicId}/${CommentId}`,{headers});
  }


}
