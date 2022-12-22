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
              answer: "Dit is een vervelend lang antwoord dat heel veel plaats inneemt"
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
              id: 5,
              correct: false,
              answer: "Antwoord E"
            },
            {
              id: 6,
              correct: false,
              answer: "Antwoord F"
            },
            {
              id: 7,
              correct: true,
              answer: "Antwoord G"
            },
            {
              id: 8,
              correct: false,
              answer: "Antwoord H"
            }
          ]
        },
        {	id: 3,
          question: "Wat is het antwoord op deze vraag 3?",
          answers: [
            {
              id: 9,
              correct: false,
              answer: "Antwoord I"
            },
            {
              id: 10,
              correct: false,
              answer: "Antwoord J"
            },
            {
              id: 11,
              correct: false,
              answer: "Antwoord K"
            },
            {
              id: 12,
              correct: true,
              answer: "Antwoord L"
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
              id: 13,
              correct: false,
              answer: "Antwoord A"
            },
            {
              id: 14,
              correct: true,
              answer: "Antwoord B"
            },
            {
              id: 15,
              correct: false,
              answer: "Antwoord C"
            },
            {
              id: 16,
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
