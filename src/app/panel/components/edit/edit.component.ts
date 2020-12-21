import { Component, OnInit } from '@angular/core';
import { Topic } from '../../../../models/topic';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { TopicService } from '../../../services/topic.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit
{

  topic:Topic;
  identity: any;
  token:String;
  status: String;
  loading = true;


  erroNOtopic: String;

  constructor(
    private _router: Router,
    private _Activerouter: ActivatedRoute,
    private _userSV: UsuarioService,
    private _topicSV: TopicService
  ){
    this.identity = _userSV.getIdentity();
    this.token = _userSV.getToken();

  }
  ngOnInit() 
  {
    this.getId_topic();
    
  }

  getId_topic()
  {
   this._Activerouter.params.subscribe(
     ide=>
     {
       let TopiID = ide.id;

       this._topicSV.getTopicsByID(TopiID).subscribe(
         res=>
         {
           if(res.status == 'success')
           {
             this.topic = null;
            //console.log("gola");
            this.topic =  res.topic
            this.loading = false
            
           }
           else if(res.status == 'error')
           {
            this.erroNOtopic = 'error';
            this.loading = false
           }
          // console.log(res);
          
         },err=>
         {
          if(err.error.status == 'error')
          {
           this.erroNOtopic = 'error';
           this.loading = false
          }
           console.log("Error al traer data",err)
         }
         
       )
     });
  }

  editTopic(form: any)
  {
    //console.log(this.topic);
    this._topicSV.editarTopic(this.topic, this.token, this.topic._id).subscribe(
      res=>
      {
        if(res.status == 'success')
        {
          this.status = res.status;
        }
        else if(res.status == 'error')
        {
          this.status = res.status;
        }
        
      },err=>console.log("err",err)
      
    )
  }
}
