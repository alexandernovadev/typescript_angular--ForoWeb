import { Component, OnInit } from '@angular/core';
import { Topic } from '../../../models/topic';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicService } from '../../services/topic.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit 
{

  page_title: String
  topics: Topic[]
  totalPages
  page
  next_page
  prev_page
  number_pages
  loading = true;

  constructor(private _routerActi: ActivatedRoute,
    private _router: Router,
    private _topicSV: TopicService) 
  { 
    this.page_title = 'Temas'
  }

  ngOnInit() 
  {
    this._routerActi.params.subscribe(
      params =>
      {
        let page = +params['page']
        //console.log("cuel",page);
        
        if(!page || page == null || page == undefined)
        {
          page = 1;
          this.prev_page = 1;
          this.next_page = 2;
          // Poco probable que pase esto
        }
        this.getTopics(page);
      }
    )
  }

  getTopics(page = 1)
  {
    this._topicSV.getTopics(page).subscribe(
      res =>
      {

        if(res.topics)
        {
          this.topics = res.topics;
          //console.log(res);

          // Hacer la navegacion de Paginacion
          this.totalPages = res.totalpages;

          var number_pages = [];

          for (var i =1 ; i <= this.totalPages; i++)
          {
             number_pages.push(i);
          }
          //console.log("for dijo", number_pages);

          this.number_pages = number_pages;

          if(page >=2)
          {
            this.prev_page = page - 1;
          }
          else 
          {
            this.prev_page = 1
          }
           
          if(page < this.totalPages ) 
          {
            this.next_page = page + 1;
          }
          else 
          { 
            this.next_page = this.totalPages
          }
          
          this.loading = false;
          // Este metodo se llama por cada iteracion que haga el usuerio
          // con la paginacion, el api trae una pagina en especifico
          // pero con el paginador pide una pagina en especifico
        }
        else
        {
          this._router.navigate(['/home'])
        }

      },err=>console.log("Erro al paginas",err)
      
    )
  }

}
