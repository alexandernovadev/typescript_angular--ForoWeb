import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { TopicService } from '../../services/topic.service';
import { empty } from 'rxjs';
import { Topic } from '../../../models/topic';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit 
{
  palabra: string
  noTopics: String
  topics:Topic[]
  loading = true

  constructor(private _activrouter:ActivatedRoute,
              private _userSV: UsuarioService,
              private _topicSV: TopicService)
  { 
  }

  ngOnInit() 
  {
    this.topics = []
    this._activrouter.params.subscribe(
      res=>
      {
      
        let id = res['text'];

        //console.log("Busque", id);
        this.palabra = id;
        this._topicSV.busqueda(id).subscribe(
          res =>
          {
            //console.log(res);
            if(res.topics > -1)
            {
              this.noTopics = 'none'
              this.loading =  false
              this.topics = []
            }
            else
            {
              this.topics = res.topics;
              this.loading =  false
            }
          },
          err=>
          {

          }
        )
        
      }
    )

  }

}
