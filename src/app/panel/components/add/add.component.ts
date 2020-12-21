import { Component, OnInit } from '@angular/core';
import { Topic } from '../../../../models/topic';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { TopicService } from '../../../services/topic.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit
{
  topic:Topic;
  identity: any;
  token:String;
  status: String;

  constructor(
    private _router: Router,
    private _Activerouter: ActivatedRoute,
    private _userSV: UsuarioService,
    private _topicSV: TopicService
  )
  {
    this.identity = _userSV.getIdentity();
    this.token = _userSV.getToken();
    this.topic = new Topic('','','','','','',this.identity._id,null);
  }

  ngOnInit()
  {

  }

  newTopics(form: any)
  {
    //console.log(this.topic);
    this._topicSV.saveTopic(this.topic , this.token).subscribe(
      res=>
      {
        //console.log(res);
        if(res.status == 'success')
        {
          this.status = res.status;
        }
        else if(res.status == 'error')
        {
          this.status = res.status;
        }

      },err=>console.log("Error save topics",err)
      );
  }

}
