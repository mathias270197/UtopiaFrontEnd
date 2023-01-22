import { Component, OnInit, Renderer2 } from '@angular/core';
import { GraduateProgramService } from '../../model/graduate-programe.service';
import { GraduateProgram } from '../../model/graduate-program';
import { Question } from '../../model/question';
import { Subscription, timer } from 'rxjs';
import { Faculty } from '../../model/faculty';
import { CoordinatesService } from '../../model/coordinates.service';
import { LocalStorageService } from '../../local-storage/local-storage.service';
import { Router } from '@angular/router';
import { BlockList } from 'net';
import { Person } from '../../login/person';
import { Answer } from '..//answer';
import { FormService } from '../form.service';
import { PointsComponent } from '../../points/points/points.component';

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.scss']
})
export class FormTemplateComponent implements OnInit {


  constructor(private graduateProgramService: GraduateProgramService, private coordinatesService: CoordinatesService, private formService: FormService
    , private renderer: Renderer2, private localStorageService: LocalStorageService, private router: Router) {

  }

  postAnswer$: Subscription = new Subscription();

  faculties: Faculty[] = [];
  faculties$: Subscription = new Subscription();
  graduatePrograms: GraduateProgram[] = [];
  graduatePrograms$: Subscription = new Subscription();

  // Structure of the graduate program
  graduateProgram: GraduateProgram = {
    id: 0,
    name: "",
    active: true,
    facultyId: 0,
    faculty: null,
    questions: [{
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
          answers: null,
        }
      ]
    }],
  };

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

  // Number of active questions
  nrOfActiveQuestions: number = 0;
  // Index of the next question
  nextQuestionIndex: number = 0;
  // Array to store the submitted answers
  answerArray: number[] = [];
  // Array with the amount of correct answers
  correctAnswerCounter: number = 0;
  // Questions answered
  questionsAnswered: number = 0;
  // Question display index
  questionDisplayIndex: number = 1;
  // Enable/disable the answer buttons
  disabled: boolean = false;
  //
  gameFinished: boolean = false;
  hasEscaped: boolean = false;
  //Points earned
  points: number = 0;

  // Variables for the timer // https://stackoverflow.com/questions/50455347/how-to-do-a-timer-in-angular-5
  initialTime: number = null!;
  timeLeft: number = this.initialTime;
  // timeLeftPercentage: number = 100;
  interval!: NodeJS.Timer;


  // Variables for linear progress bar
  progressStyle = "#008000";
  // Color palette // https://meyerweb.com/eric/tools/color-blend/#00FF00:FF0000:10:hex
  // Should be replaced by a formula to calculate the color instead of fixed values
  colorPalette: string[] = ["#008000", "#008000", "#008000", "#008000", "#008000", "#008000", "#008000", "#FFA500", "#FF8C00", "#FF0000", "#FF0000"];
  colorPalleteIndex = 0;



  ngOnInit(): void {
    // this.getFaculties();
    // this.getFacultyById(1);

    this.nextQuestionIndex = 0;
    this.answerArray = [];
    this.correctAnswerCounter = 0;
    this.questionsAnswered = 0;
    this.questionDisplayIndex = 1;
    this.disabled = false;
    this.gameFinished = false;
    this.hasEscaped = false;
    this.points = 0;
    clearInterval(this.interval);
    let currentFormId = Number(this.localStorageService.getActiveStationId());
    this.getGraduateProgramById(currentFormId);
  }

  // // Get all the faculties and their graduate programs
  // async getFaculties() {
  //   this.faculties$ = await this.graduateProgramService.getFacultiesAsync().subscribe(faculties => {
  //     this.faculties = faculties;
  //     console.log('This is the array with the faculties:')
  //     console.log(this.faculties);
  //   });
  //   // this.getNextQuestion(this.nextQuestionIndex);
  // }

  // // Get one faculty and its graduate programs
  // async getFacultyById(id: number) {
  //   this.faculties$ = await this.graduateProgramService.getFacultyById(id).subscribe(faculties => {
  //     this.faculties = faculties;
  //     console.log('This is the array with the faculty:')
  //     console.log(this.faculties);
  //   });
  //   // this.getNextQuestion(this.nextQuestionIndex);
  // }

  // Get one graduate program with questions and multiple choice answers
  async getGraduateProgramById(id: number) {
    this.graduatePrograms$ = await this.graduateProgramService.getGraduateProgramById(id).subscribe(graduatePrograms => {
      this.graduatePrograms = graduatePrograms;
      this.graduateProgram = graduatePrograms[0];
      console.log('This is the array with the graduate programs:')
      console.log(this.graduatePrograms);
      this.nrOfActiveQuestions = 0;
      for (let i = 0; i < graduatePrograms[0].questions.length; i++) {
        if (graduatePrograms[0].questions[i].active == true)
          this.nrOfActiveQuestions += 1;
      };
      console.log('Number of active questions: ' + this.nrOfActiveQuestions)
      this.getNextQuestion(this.nextQuestionIndex);
      this.initialTime = 10 * this.nrOfActiveQuestions;
      this.timeLeft = this.initialTime;
      setTimeout(() => {
        this.renderer.removeStyle(document.body, 'animation-name');
      }, 1000);
      this.startTimer();
    });
  }

  // Get the next question so it can be injected in the form
  getNextQuestion(questionIndex: number) {
    this.currentQuestion = this.graduatePrograms[0].questions[questionIndex];
    console.log('Next question is at position ' + questionIndex + ' in the question array.');
  }

  // Add the answer to the answer array
  addAnswer(questionId: number, answerId: number, correct: boolean) {
    this.sendAnswerToBackend(answerId)
    console.log("post answer in component")
    this.renderer.setStyle(document.body, 'animation-timing-function', 'linear');
    if (correct == true) {
      this.renderer.setStyle(document.body, 'animation-name', 'anim-correct');
      this.correctAnswerCounter += 1;
    } else {
      this.renderer.setStyle(document.body, 'animation-name', 'anim-incorrect');
    }
    this.answerArray.push(answerId);
    this.questionsAnswered += 1;
    console.log('------------------------------------------');
    console.log('Processing question ID: ' + questionId);
    console.log('Clicked answer ID: ' + answerId);
    console.log('This answer is correct: ' + correct);
    console.log('This is the answerArray:');
    console.log(this.answerArray);
    console.log('------------------------------------------');
    // Wait half a second
    setTimeout(() => {
      this.renderer.removeStyle(document.body, 'animation-name');
    }, 500);
    if (this.nrOfActiveQuestions == this.questionsAnswered) {
      // Stop the time
      this.pauseTimer();
    } else {
      this.nextQuestionIndex += 1;
      this.getNextQuestion(this.nextQuestionIndex);
      this.questionDisplayIndex += 1;
    }

  }

  // Initiate the timer
  startTimer() {
    const me = this;
    let perc = 0;
    let currentColorFromPalette = this.colorPalette[0];
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 0;
        this.pauseTimer();

      }
      perc = ((this.initialTime - this.timeLeft) / this.initialTime) * 100;
      this.colorPalleteIndex = Math.floor(perc / 10);
      // console.log(perc, this.colorPalleteIndex);
      currentColorFromPalette = this.colorPalette[this.colorPalleteIndex];
      me.progressStyle = `linear-gradient(to right, #FFFFFF ${perc}%, ${currentColorFromPalette} ${perc}%)`;
    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
    // Disable the buttons
    this.disabled = true;
    // Show messages and the result
    this.showResult()
  };

  retry() {
    this.ngOnInit();
  }

  showResult() {
    console.log('Aantal jusite antwoorden: ', this.correctAnswerCounter);
    this.gameFinished = true;
    if (this.questionsAnswered == this.nrOfActiveQuestions) {
      console.log("correct aantal antwoorden: " + this.correctAnswerCounter);
      console.log("tijd over: " + this.timeLeft);

      // Calculate the points for this 
      this.points = this.calculatePoints(this.correctAnswerCounter, this.timeLeft);

      // Store in the local storage
      let completedStations: any[] = this.localStorageService.getCompletedStations();
      console.log('Completed stations: ' + completedStations)
      // Check if the stations is already done or not
      let indexCurrentStation = null;
      if (completedStations.length > 0) {
        for (let i = 0; i < completedStations.length; i++) {
          if (completedStations[i].graduateProgramId == this.graduateProgram.id) {
            indexCurrentStation = i;
          }
        }
      }
      if (indexCurrentStation == null) {
        // Add
        completedStations.push(
          {
            graduateProgramId: this.graduateProgram.id,
            score: this.points,
          }
        )
      } else {
        // Update
        completedStations[indexCurrentStation].score = this.points;
      }
      this.localStorageService.setCompletedStations(completedStations);
      this.hasEscaped = true;

    } else {
      this.hasEscaped = false;
    }
  }

  calculatePoints(correctAnswerCounter: number, timeLeft: number) {
    var multiplier = Math.round(timeLeft / 10) + 10 //number between 10 and 20
    var points = correctAnswerCounter * multiplier //number between 0 200
    return points;
  }

  goBack() {
    this.localStorageService.setCurrentLine(1)
    this.router.navigateByUrl("/stations")
  }



  //send the answer to the backend
  sendAnswerToBackend(MultipleChoiceAnswerId: number) {
    var person: Person = this.localStorageService.getCurrentUser();
    var answer: Answer = {
      MultipleChoiceAnswerId: MultipleChoiceAnswerId,
      Person: person
    }
    this.postAnswer$ = this.formService.postAnswer(answer).subscribe({
      // next: (v) => this.router.navigateByUrl("/admin/category"),
      error: (e) => console.log(e.message)
    });
  }

}
