import { Component, OnInit } from '@angular/core';
import { GraduateProgramService } from '../model/graduate-programe.service';
import { GraduateProgram } from '../model/graduate-program';
import { Question } from '../model/question';
import { Subscription, timer } from 'rxjs';
import { Faculty } from '../model/faculty';
import { CoordinatesService } from '../model/coordinates.service';

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.scss']
})
export class FormTemplateComponent implements OnInit {

  constructor(private graduateProgramService: GraduateProgramService, private coordinatesService: CoordinatesService) {
  }

  faculties: Faculty[] = [];
  faculties$: Subscription = new Subscription();
  graduatePrograms: GraduateProgram[] = [];
  graduatePrograms$: Subscription = new Subscription();

  // Structure of the graduate program

  // graduateProgram: GraduateProgram[] = [{
  //   id: 0,
  //   name: "",
  //   active: true,
  //   facultyId: 0,
  //   questions: [{
  //     id: 0,
  //     textualQuestion: "",
  //     active: true,
  //     graduateProgramId: 0,
  //     multipleChoiceAnswers: [
  //       {
  //         id: 0,
  //         textualAnswer: "",
  //         active: true,
  //         correct: false,
  //         questionId: 0,
  //       }
  //     ]
  //   }]
  // }];

  // Var with the current question
  currentQuestion: Question = {
    id: 0,
    textualQuestion: "",
    active: true,
    graduateProgramId: 0,
    multipleChoiceAnswers: [
      {
        id: 0,
        textualAnswer: "",
        active: true,
        correct: false,
        questionId: 0,
        answers: 0,
      }
    ]
  };

  // Index of the next question
  nextQuestionIndex: number = 0;



  // Array to store the submitted answers
  answerArray: number[] = [];

  // Variables for the timer // https://stackoverflow.com/questions/50455347/how-to-do-a-timer-in-angular-5
  initialTime: number = 100;
  timeLeft: number = this.initialTime;
  // timeLeftPercentage: number = 100;
  interval!: NodeJS.Timer;


  // Variables for linear progress bar
  progressStyle = "#00FF00";
  // Color palette // https://meyerweb.com/eric/tools/color-blend/#00FF00:FF0000:10:hex
  // Should be replaced by a formula to calculate the color instead of fixed values
  colorPalette: string[] = ["#00FF00", "#1AE600", "#33CC00", "#4DB300", "#669900", "#808000", "#996600", "#B34D00", "#CC3300", "#E61A00", "#FF0000"];
  colorPalleteIndex = 0;



  ngOnInit(): void {
    this.getFaculties();
    this.getFacultyById(1);
    this.getGraduateProgramById(1);

    this.coordinatesService.getCoordinates();
    // this.startTimer();
  }

  // Get all the faculties and their graduate programs
  async getFaculties() {
    this.faculties$ = await this.graduateProgramService.getFaculties().subscribe(faculties => {
      this.faculties = faculties;
      console.log('This is the array with the faculties:')
      console.log(this.faculties);
    });
    // this.getNextQuestion(this.nextQuestionIndex);
  }

  // Get one faculty and its graduate programs
  async getFacultyById(id: number) {
    this.faculties$ = await this.graduateProgramService.getFacultyById(id).subscribe(faculties => {
      this.faculties = faculties;
      console.log('This is the array with the faculty:')
      console.log(this.faculties);
    });
    // this.getNextQuestion(this.nextQuestionIndex);
  }

  // Get one graduate program with questions and multiple choice answers
  async getGraduateProgramById(id: number) {
    this.graduatePrograms$ = await this.graduateProgramService.getGraduateProgramById(id).subscribe(graduatePrograms => {
      this.graduatePrograms = graduatePrograms;
      console.log('This is the array with the graduate programs:')
      console.log(this.graduatePrograms);
    });
    // this.getNextQuestion(this.nextQuestionIndex);
  }



  // getNextQuestion(questionIndex: number) {
  //   this.currentQuestion = this.graduatePrograms[0].questions[questionIndex];
  //   console.log('Next question is at position ' + questionIndex + ' in the question array.');

  //   // Reload component here?

  // }

  // addAnswer(questionId: number, answerId: number) {
  //   this.answerArray.push(answerId);
  //   this.nextQuestionIndex += 1;
  //   console.log('--------------------------');
  //   console.log('Processing question ID: ' + questionId);
  //   console.log('Clicked answer ID: ' + answerId);
  //   console.log('This is the answerArray:');
  //   console.log(this.answerArray);
  //   this.getNextQuestion(this.nextQuestionIndex);
  // }

  // startTimer() {
  //   const me = this;
  //   let perc = 0;
  //   let currentColorFromPalette = this.colorPalette[0];
  //   this.interval = setInterval(() => {
  //     if (this.timeLeft > 0) {
  //       this.timeLeft--;
  //     } else {
  //       this.timeLeft = 0;
  //     }
  //     perc = ((this.initialTime - this.timeLeft) / this.initialTime) * 100;
  //     this.colorPalleteIndex = Math.floor(perc / 10);
  //     currentColorFromPalette = this.colorPalette[this.colorPalleteIndex];
  //     me.progressStyle = `linear-gradient(to right, #FFFFFF ${perc}%, ${currentColorFromPalette} ${perc}%)`;

  //   }, 1000)
  // }

  // pauseTimer() {
  //   clearInterval(this.interval);
  // }


}
