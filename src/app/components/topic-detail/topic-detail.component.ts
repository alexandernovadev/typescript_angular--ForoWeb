import { Component, OnInit } from '@angular/core';
import { TopicService } from '../../services/topic.service';
import { ActivatedRoute } from '@angular/router';
import { Topic } from '../../../models/topic';
import { Comment } from '../../../models/comment';
import { UsuarioService } from 'src/app/services/usuario.service';
import { identity } from 'rxjs';
import { CommentService } from '../../services/comment.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css']
})
export class TopicDetailComponent implements OnInit 
{

  topic: Topic
  loading = true
  noexist = false
  comment: Comment
  identity: any
  token: String
  status: String
  urlapi = global.url;

  constructor(
    private _topicSV: TopicService,
    private _activerouter: ActivatedRoute,
    private _userSV: UsuarioService,
    private _commentSV: CommentService
  )
  {
    this.identity = _userSV.getIdentity();
    this.token = _userSV.getToken();
    this.comment = new Comment('','','',this.identity._id);
  }

  ngOnInit()
  {
    this.getTopics();
  }

  getTopics()
  {
    this._activerouter.params.subscribe(
      params => 
      {
        let id = params['id'];
        this._topicSV.getTopicsByID(id).subscribe(
          res=>
          {
            if(res.status == 'success')
            {
              this.topic = res.topic
              this.loading = false
              console.log(this.topic);
              
            }
            else
            {
              console.log("No esxite topics");
              this.loading = false
            }
            
            
          },err => 
          {
            this.noexist =  true;
            console.log("Erro al sacar ", err.error)
            this.loading = false
          }
          
        )
      }
    )
  }

  enviarComment(form)
  {
    
    console.log(this.comment);
    this._commentSV.saveComment(this.comment, this.token, this.topic._id).subscribe(
      res=>
      {
        //console.log(res);
        if(res.status == 'success')
        {
          
          form.reset()
          this.topic = res.topic;
          this.status = res.status;
        }
        else if(res.status == 'error'){
          this.status = res.status;
        }
      },
      err=>
      {
        // console.log("ALERERRR",err);
        
        if(err.error.status == 'error'){
          this.status = err.error.status;
        }
      }
    )
  }

  deleteComment(id:any)
  {
    this._commentSV.eliminaComment(this.topic._id, id, this.token).subscribe(
      res => 
      {
        //console.log(res);
        this.topic = res.topic
      },
      err=>
      {
        console.log(err);
        
      }
    )
  }
}
