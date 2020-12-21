import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class TopicService 
{

  url: String;
  constructor(private _http: HttpClient)
  {
    this.url = global.url;
  }

  saveTopic(topic: any , token: any): Observable<any> 
  {
    let params = JSON.stringify(topic);

    let headers = new HttpHeaders().set('Content-Type','application/json')
                                   .set('Authorization', token);

    return this._http.post(this.url + 'topic', params,{headers});
  }

  editarTopic(topic: any , token: any, ide:any): Observable<any> 
  {
    let params = JSON.stringify(topic);

    let headers = new HttpHeaders().set('Content-Type','application/json')
                                   .set('Authorization', token);
                                   
    return this._http.put(`${this.url}/update/${ide}`, params,{headers});
  }

  eliminaropics(id: any, token:any): Observable<any> 
  {

    let headers = new HttpHeaders().set('Content-Type','application/json')
                                   .set('Authorization', token);
                                   
    return this._http.delete(`${this.url}/delete/${id}`,{headers});
  }

  getTopicsByUser(id: any): Observable <any>
  {
    let headers = new HttpHeaders().set('Content-Type','application/json')

    return this._http.get(`${this.url}/user-topics/${id}`,{headers});
  }

  getTopicsByID(id: any): Observable <any>
  {
    let headers = new HttpHeaders().set('Content-Type','application/json')

    return this._http.get(`${this.url}/topic/${id}`,{headers});
  }


  getTopics(page = 1): Observable <any>
  {
    return this._http.get(`${this.url}/topics/${page}`);
  }

  busqueda(text: any): Observable <any>
  {
    return this._http.get(`${this.url}/search/${text}`);
  }
}
