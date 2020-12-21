import { Component, OnInit } from '@angular/core';
import { TopicService } from '../../../services/topic.service';
import { Topic } from '../../../../models/topic';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit
{

  topics: Topic [] = [];
  token: String;
  identity: any;

  constructor(private _topicsSV: TopicService,
              private _userSV: UsuarioService) 
  {
    this.token = _userSV.getToken();
    this.identity = _userSV.getIdentity();
  }

  ngOnInit()
  {
    this.getTopics();
  }

  getTopics()
  {
    this._topicsSV.getTopicsByUser(this.identity._id).subscribe(
      res=>
      {
        this.topics = res.TopicsUser;
        //console.log(this.topics);
        
      },err=>console.log("Erro al traer topics", err)
      
    );
  }

  eliminarTopic(id: any)
  {
    //console.log(id);

    this._topicsSV.eliminaropics(id, this.token).subscribe(
      res=>
      {
        if(res.status == 'success')
        {
          //console.log("Se elimio");
          this.getTopics();
        }
      },
      err=>console.log("Error", err)
      
    )
    
  }
}
