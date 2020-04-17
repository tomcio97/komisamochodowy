import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/app/_models/Question';
import { EmailService } from 'src/app/_services/email.service';
import { AlertifyService } from 'src/app/_services/Alertify.service';
import { QuestionService } from 'src/app/_services/question.service';

@Component({
  selector: 'app-value-answer',
  templateUrl: './value-answer.component.html',
  styleUrls: ['./value-answer.component.css']
})
export class ValueAnswerComponent implements OnInit {

  @Input() question: Question;
  @Input() questions: Question[];
  mail: any = {};
  constructor(private mailService: EmailService, private alertify: AlertifyService, private questionService: QuestionService) { }

  ngOnInit() {
  }

  sendMail()
  {
    this.alertify.confirm('Wysłać odpowiedź ?', () =>
    {
      this.mail.email = this.question.email;
      this.mail.subject = 'Odpowiedź ' + this.question.valueMark + ' ' + this.question.valueModel;
      this.mailService.sendMail(this.mail).subscribe(() => {
        this.alertify.success('Odpowiedź została wysłana');
        this.removeQuestion(1, this.question.id);
      }, error => {
        this.alertify.error('Wiadomość nie została wysłana');
      });
    });
  }

  removeQuestion(valueId: number, id: number)
  {
    this.questionService.removeQuestion(valueId, id).subscribe(() => {
      this.questions.splice(this.questions.findIndex(q => q.id === id), 1);
      console.log('Usunięto');
    }, error =>
    {
      console.log(error);
    });
  }

}
