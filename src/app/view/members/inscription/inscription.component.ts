import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MemberServiceService} from '../../../controller/service/member-service.service';
import {Member} from '../../../controller/model/member';
import {LoginService} from '../../../controller/service/login.service';
import {AppComponent} from '../../../app.component';
import {Types} from '../../../controller/model/types';
import {Fillier} from '../../../controller/model/fillier';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})

export class InscriptionComponent implements OnInit {
  types: Types[];
  fillier: Fillier[];
  listMembre: Array<Member>;
  constructor(private messageService: MessageService,
              private confirmationService: ConfirmationService, private menu: AppComponent,
              private service: MemberServiceService, private serviceLogin: LoginService, private router: Router) {
    this.types = [
      {name: '1ère année'},
      {name: '2ème année'},
      {name: '3ème année'},
      {name: '4ème année'},
      {name: '5ème année'},
      {name: '6ème année'}
    ];
    this.fillier = [
      {name: 'ARC'},
      {name: 'ASP'},
      {name: 'AUTO'},
      {name: 'CIT'},
      {name: 'COM'},
      {name: 'DAP'},
      {name: 'ENG'},
      {name: 'EPP'},
      {name: 'FEA'},
      {name: 'G2I'},
      {name: 'GI'},
      {name: 'IBM'},
      {name: 'IPL'},
      {name: 'JAL'},
      {name: 'LDA'},
      {name: 'LOG'},
      {name: 'MDEN'},
      {name: 'MEDINA'},
      {name: 'MKG'},
      {name: 'MRH'},
      {name: 'MTH'},
      {name: 'PGE'},
      {name: 'PRI'},
      {name: 'SCM'}
    ];
  }
  get submitted(): boolean {
    return this.service.submitted;
  }

  set submitted(value: boolean) {
    this.service.submitted = value;
  }
  get member(): Member {
    return this.service.member;
  }

  set member(value: Member) {
    this.service.member = value;
  }
  storeValue(event) {
    console.log(event);
    this.member.niveau = event.originalEvent.srcElement.innerText;
  }
  storeValueFillier(event) {
    console.log(event);
    this.member.fillier = event.originalEvent.srcElement.innerText;
  }
  public urlfind(link: any) {
    if (link !== null) {
      const url = link;
      const found = url.match(/d\/([A-Za-z0-9\-\_]+)/);
      if (found !== null) {
        console.log('hadaaaaa found== ' + found[1]);
        return 'https://drive.google.com/uc?export=view&id=' + found[1];
      }
    }
    return link;
  }
  public save() {
    console.log(this.member);
    this.submitted = true;
    if (this.member.image){
      this.member.image = this.urlfind(this.member.image);
    }
    this.service.create().subscribe(data => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Registration added, please check your email to get your password.',
        life: 4000
      });
    }, error => {
      this.messageService.add({
        severity: 'error',
        summary: 'Warning',
        detail: 'Registration canceled',
        life: 3000
      });
      console.log(error);
    });
    this.member = new Member();
  }
  set model(value: any[]) {
    this.serviceLogin.model = value;
  }
  ngOnInit(): void {
    this.member = new Member();
    this.model = null;
    this.menu.layoutMode = 'Overlay';
  }

}
