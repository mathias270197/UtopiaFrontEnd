import { Component, OnInit } from '@angular/core';
import { GraduateProgramService } from '../graduate-programe.service';
import { GraduateProgram } from '../graduate-program';
import { Question } from '../question';
import { timer } from 'rxjs';

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.scss']
})
export class FormTemplateComponent implements OnInit {

  // Structure of the graduate program
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

  // Index of the next question
  nextQuestionIndex: number = 0;
  
  // Var with the current question
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
  
  // Array to store the submitted answers
  answerArray: number[] = [];

  // Variables for the timer // https://stackoverflow.com/questions/50455347/how-to-do-a-timer-in-angular-5
  initialTime: number = 100;
  timeLeft: number = this.initialTime;
  // timeLeftPercentage: number = 100;
  interval!: NodeJS.Timer;

  // Variables for the circular progress
  percent: number = 100;
  radius: number = 25;
  showInnerStroke: boolean = false;
  outerStrokeWidth: number = 3;
  innerStrokeWidth: number = 1;
  outerStrokeColor: string = "#78C000";
  innerStrokeColor: string = "#78C000";
  animation: boolean = true;
  animationDuration: number = 1000 * this.initialTime;
  showUnits: boolean = false;
  showSubtitle: boolean = false;
  startFromZero: boolean = false;
  // title: string = this.timeLeft.toString();
  // title: string = this.timeLeft.toString();


  // Variables for linear progress bar
  progressStyle = "#00FF00";
  // Color palette // https://meyerweb.com/eric/tools/color-blend/#00FF00:FF0000:10:hex
  // Should be replaced by a formula to calculate the color instead of fixed values
  colorPalette: string[] = ["#00FF00","#1AE600","#33CC00","#4DB300","#669900","#808000","#996600","#B34D00","#CC3300","#E61A00","#FF0000"];
  colorPalleteIndex = 0;

  constructor(private graduateProgramService: GraduateProgramService) { 
  }

  ngOnInit(): void {
    this.getGraduateProgram(1);
    this.startTimer();
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
    console.log('Processing question ID: ' + questionId);
    console.log('Clicked answer ID: ' + answerId);
    console.log('This is the answerArray:');
    console.log(this.answerArray);
    this.getNextQuestion(this.nextQuestionIndex);
  }

  startTimer() {
    const me = this;
    let perc = 0;
    let currentColorFromPalette = this.colorPalette[0];
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 0;
      }
      perc = ((this.initialTime - this.timeLeft)/this.initialTime) *100;
      this.colorPalleteIndex = Math.floor(perc/10);
      currentColorFromPalette = this.colorPalette[this.colorPalleteIndex];
      // me.progressStyle = `linear-gradient(to right, #FFFFFF ${perc}%, #00FF00 ${perc}%)`;
      me.progressStyle = `linear-gradient(to right, #FFFFFF ${perc}%, ${currentColorFromPalette} ${perc}%)`;

    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }


}
