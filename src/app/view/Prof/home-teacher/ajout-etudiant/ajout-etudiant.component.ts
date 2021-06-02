/* tslint:disable:quotemark */
import { Component, OnInit } from '@angular/core';
import {Etudiant} from "../../../../controller/Model/etudiant.model";
import {MessageService} from "primeng/api";
import {EtudiantService} from "../../../../controller/service/etudiant.service";

@Component({
  selector: 'app-ajout-etudiant',
  templateUrl: './ajout-etudiant.component.html',
  styleUrls: ['./ajout-etudiant.component.scss']
})
export class AjoutEtudiantComponent implements OnInit {

  constructor(private messageService: MessageService, private service: EtudiantService) { }

  ngOnInit(): void {
  }
  public hideCreateDialog() {
    this.createDialogEtud = false;
    this.submitted = false;
  }
  public save() {
    this.submitted = true;
    if (this.selected.nom.trim()) {
      this.service.save().subscribe(data => {
        this.items.push({...data});
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Etudiant Created',
          life: 3000
        });
      });
      this.createDialogEtud = false;
      this.selected = new Etudiant();
    }
  }
  get selected(): Etudiant {
    return this.service.selected;
  }

  set selected(value: Etudiant) {
    this.service.selected = value;
  }

  get createDialogEtud(): boolean {
    return this.service.createDialog;
  }

  set createDialogEtud(value: boolean) {
    this.service.createDialog = value;
  }

  get submitted(): boolean {
    return this.service.submitted;
  }

  set submitted(value: boolean) {
    this.service.submitted = value;
  }

  get items(): Array<Etudiant> {
    return this.service.items;
  }

  set items(value: Array<Etudiant>) {
    this.service.items = value;
  }



}
