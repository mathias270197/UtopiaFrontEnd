import { Injectable } from '@angular/core';
import { GraduateProgram } from './graduate-program';

@Injectable({
  providedIn: 'root'
})
export class GraduateProgramService {

  private graduatePrograms: GraduateProgram[] = [];

  constructor() { 

    let graduateProgram: GraduateProgram = {
      id: 1,
      name: "Informatica",
      questions: [
        {	id: 1,
          question: "Wat is het antwoord op deze vraag 1?",
          answers: [
            {
              id: 1,
              correct: true,
              answer: "Antwoord A"
            },
            {
              id: 2,
              correct: false,
              answer: "Antwoord B"
            },
            {
              id: 3,
              correct: false,
              answer: "Antwoord C"
            },
            {
              id: 4,
              correct: false,
              answer: "Antwoord D"
            }
          ]
        },
        {	id: 2,
          question: "Wat is het antwoord op deze vraag 2?",
          answers: [
            {
              id: 1,
              correct: false,
              answer: "Antwoord A"
            },
            {
              id: 2,
              correct: false,
              answer: "Antwoord B"
            },
            {
              id: 3,
              correct: true,
              answer: "Antwoord C"
            },
            {
              id: 4,
              correct: false,
              answer: "Antwoord D"
            }
          ]
        },
        {	id: 3,
          question: "Wat is het antwoord op deze vraag 3?",
          answers: [
            {
              id: 1,
              correct: false,
              answer: "Antwoord A"
            },
            {
              id: 2,
              correct: false,
              answer: "Antwoord B"
            },
            {
              id: 3,
              correct: false,
              answer: "Antwoord C"
            },
            {
              id: 4,
              correct: true,
              answer: "Antwoord D"
            }
          ]
        }
      ]
    };
    this.graduatePrograms.push(graduateProgram);

    let graduateProgram2: GraduateProgram = {
      id: 1,
      name: "Sociaal werk",
      questions: [
        {	id: 1,
          question: "Wat is het antwoord op deze vraag 2",
          answers: [
            {
              id: 1,
              correct: false,
              answer: "Antwoord A"
            },
            {
              id: 2,
              correct: true,
              answer: "Antwoord B"
            },
            {
              id: 3,
              correct: false,
              answer: "Antwoord C"
            },
            {
              id: 4,
              correct: false,
              answer: "Antwoord D"
            }
          ]
        }
      ]
    };
    this.graduatePrograms.push(graduateProgram2);

  }

  getGraduatePrograms(): GraduateProgram[] {
    return this.graduatePrograms;
  }

  getGraduateProgramById(id: number): GraduateProgram | null {
    return this.graduatePrograms.find(a => a.id === id) ?? null;
  }
}
