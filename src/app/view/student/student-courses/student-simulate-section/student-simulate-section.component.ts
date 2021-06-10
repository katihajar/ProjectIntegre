import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Section} from '../../../../controller/Model/section.model';
import {Cours} from '../../../../controller/Model/cours.model';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ParcoursService} from '../../../../controller/service/parcours.service';
import {HttpClient} from '@angular/common/http';
import {QuizEtudiantService} from '../../../../controller/service/quiz-etudiant.service';
import {Quiz} from '../../../../controller/Model/quiz.model';
import {LoginService} from '../../../../controller/service/login.service';
import {Etudiant} from '../../../../controller/Model/etudiant.model';
import {QuizEtudiant} from '../../../../controller/Model/quiz-etudiant.model';

@Component({
  selector: 'app-student-simulate-section',
  templateUrl: './student-simulate-section.component.html',
  styleUrls: ['./student-simulate-section.component.scss']
})
export class StudentSimulateSectionComponent implements OnInit {


  // tslint:disable-next-line:max-line-lengthg
  constructor(private messageService: MessageService, private sanitizer: DomSanitizer, private confirmationService: ConfirmationService, private service: ParcoursService, private http: HttpClient, private quizService: QuizEtudiantService, private loginService: LoginService) { }
  value = 0;

  get image(): string {
    return this.service.image;
  }

  set image(value: string) {
    this.service.image = value;
  }

  ngOnInit(): void {

  }
  get progress(): number {
    return this.service.progress;
  }
  get selectedsection(): Section {
    return this.service.selectedsection;
  }

  set selectedsection(value: Section) {
    this.service.selectedsection = value;
  }
  // tslint:disable-next-line:adjacent-overload-signatures
  set progress(value: number) {
    this.service.progress = value;
  }

  get selectedQuiz(): Quiz {
    return this.quizService.selectedQuiz;
  }

  set selectedQuiz(value: Quiz) {
    this.quizService.selectedQuiz = value;
  }

  get etudiant(): Etudiant {
    return this.loginService.etudiant;
  }

  set etudiant(value: Etudiant) {
    this.loginService.etudiant = value;
  }

  get quizEtudiantList(): QuizEtudiant {
    return this.quizService.quizEtudiantList;
  }

  set quizEtudiantList(value: QuizEtudiant) {
    this.quizService.quizEtudiantList = value;
  }

  get passerQuiz(): string {
    return this.quizService.passerQuiz;
  }

  set passerQuiz(value: string) {
    this.quizService.passerQuiz = value;
  }

  get quizView(): boolean {
    return this.quizService.quizView;
  }

  set quizView(value: boolean) {
    this.quizService.quizView = value;
  }

  NextSection() {
    this.service.affichelistSection().subscribe(
        data => {
          this.itemssection2 = data;
          // tslint:disable-next-line:no-shadowed-variable
        });
    this.selectedsection.numeroOrder = this.selectedsection.numeroOrder - 1;
    // tslint:disable-next-line:triple-equals
    if (this.selectedsection.numeroOrder != 0){
      this.service.afficheOneSection2().subscribe(
          data => {
            this.selectedsection = data;
            this.quizService.findQuizBySectionId(this.selectedsection).subscribe(
                data => {
                  this.selectedQuiz = data;
                  document.getElementById('quiz').style.visibility = 'visible'
                  this.quizService.findQuizEtudiant(this.loginService.etudiant, this.selectedQuiz).subscribe(
                      data => {
                        this.quizEtudiantList = data;
                        console.log(this.quizEtudiantList);
                        this.passerQuiz = 'View Quiz';
                        this.quizView = true;
                      },error =>
                      {
                        this.passerQuiz = 'Passer Quiz';
                        this.quizView = false;
                      }
                  );
                },error => document.getElementById('quiz').style.visibility = 'hidden'
            );
          });
    }else{
      this.selectedsection.numeroOrder = 6;
      this.NextSection();
    }
  }
  photoURL() {
    this.service.image = '';
    for (let j = 0; j < 66 ; j++)
    {
      this.service.image += this.selectedsection.urlImage[j];
    }
    this.service.image += 'preview';
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.service.image);
  }

  PreviousSection() {
    this.service.affichelistSection().subscribe(
        data => {
          this.itemssection2 = data;
          // tslint:disable-next-line:no-shadowed-variable
        });
    this.selectedsection.numeroOrder = this.selectedsection.numeroOrder + 1;
    // tslint:disable-next-line:triple-equals
    if (this.selectedsection.numeroOrder != 6){
      this.service.afficheOneSection2().subscribe(
          data => {
            this.selectedsection = data;
            this.quizService.findQuizBySectionId(this.selectedsection).subscribe(
                data => {
                  this.selectedQuiz = data;
                  document.getElementById('quiz').style.visibility = 'visible'
                  this.quizService.findQuizEtudiant(this.loginService.etudiant, this.selectedQuiz).subscribe(
                      data => {
                        this.quizEtudiantList = data;
                        console.log(this.quizEtudiantList);
                        this.passerQuiz = 'View Quiz';
                        this.quizView = true;
                      },error =>
                      {
                        this.passerQuiz = 'Passer Quiz';
                        this.quizView = false;
                      }
                  );
                },error => document.getElementById('quiz').style.visibility = 'hidden'
            );
          });
    }else{
      this.selectedsection.numeroOrder = 0;
      this.PreviousSection();
    }
  }
  set selectedcours(value: Cours) {
    this.service.selectedcours = value;
  }
  get selectedcours(): Cours{
    return this.service.selectedcours;
  }
  set itemssection2(value: Array<Section>) {
    this.service.itemssection2 = value;
  }
  get itemssection2(): Array<Section> {
    return this.service.itemssection2;
  }
  get selectessection(): Array<Section> {
    return this.service.selectessection;
  }
  set selectessection(value: Array<Section>) {
    this.service.selectessection = value;
  }
}
