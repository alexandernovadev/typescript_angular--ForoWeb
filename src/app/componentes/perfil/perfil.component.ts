import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { User } from '../../../models/user';
import { Topic } from '../../../models/topic';
import { global } from 'src/app/services/global';
import { TopicService } from '../../services/topic.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit
{

  public  user: User
  public topics: Topic[]
  url = global.url
  loading = true;
  nouser= false


  constructor(private _actiRoute: ActivatedRoute,
              private _userSV: UsuarioService,
              private _topicSV: TopicService) 
  {

  }

  ngOnInit() 
  {
    this.getUser()
  }

  getUser()
  {
    this._actiRoute.params.subscribe(
      param=>
      {
        let id = param['id'];
        this._userSV.getUser(id).subscribe(
          res=>
          { 
            console.log(res.user);
            this.user = res.user
            this._topicSV.getTopicsByUser(id).subscribe(
              res=>
              { 
                this.topics = res.TopicsUser;
                this.loading = false;
              },
              err=>
              {
    
              }
            )
          },
          err =>
          {
            console.log('No existe el usuario');
            this.loading = false;
            this.nouser = true
          }
        )

        
      }
    )
  }
}
