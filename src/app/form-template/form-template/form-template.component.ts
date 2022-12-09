import { Component, OnInit } from '@angular/core';
import { GraduateProgramService } from '../graduate-programe.service';
import { GraduateProgram } from '../graduate-program';
import { Question } from '../question';

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.css']
})
export class FormTemplateComponent implements OnInit {

  graduateProgram: GraduateProgram = {
    id: 0,
    name: "",
    questions: [{
      id: 0,
      question: "",
      answers: [
        {
          id: 0,
          correct: false,
          answer: ""
        }
      ]
    }]
  };

  nextQuestionIndex: number = 0;
  
  currentQuestion: Question = {
    id: 0,
    question: "",
    answers: [
      {
        id: 0,
        correct: false,
        answer: ""
      }
    ]
  };
  
  answerArray: number[] = [];

  constructor(private graduateProgramService: GraduateProgramService) { }

  ngOnInit(): void {
    this.getGraduateProgram(1);
  }

  getGraduateProgram(id: number) {
    this.graduateProgram = this.graduateProgramService.getGraduateProgramById(1)!;
    console.log('This is the array with the graduate programs:')
    console.log(this.graduateProgram);
    this.getNextQuestion(this.nextQuestionIndex);
  }

  getNextQuestion(questionIndex: number) {
    this.currentQuestion = this.graduateProgram.questions[questionIndex];
    console.log('Next question is at position ' + questionIndex + ' in the question array.');

    // Reload component here?
    
  }

  addAnswer(questionId: number, answerId: number) {
    this.answerArray.push(answerId);
    this.nextQuestionIndex += 1;
    console.log('--------------------------');
    console.log('Processing question: ' + questionId);
    console.log('Clicked answer: ' + answerId);
    console.log('This is the answerArray:');
    console.log(this.answerArray);
    this.getNextQuestion(this.nextQuestionIndex);
  }

}
