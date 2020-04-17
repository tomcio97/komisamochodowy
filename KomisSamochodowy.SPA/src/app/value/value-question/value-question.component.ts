import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/_models/Question';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from 'src/app/_services/email.service';
import { AlertifyService } from 'src/app/_services/Alertify.service';
import { NgModel } from '@angular/forms';
import { QuestionService } from 'src/app/_services/question.service';

@Component({
  selector: 'app-value-question',
  templateUrl: './value-question.component.html',
  styleUrls: ['./value-question.component.css']
})
export class ValueQuestionComponent implements OnInit {

  questions: Question[];
  constructor(private route: ActivatedRoute, private service: QuestionService) { }

  ngOnInit() {
    this.route.data.subscribe(data =>
      {
        this.questions = data.questions;
      });
  }

}
