import { Question } from "./question";

export interface GraduateProgram {
	id: number;
    name: string;
	questions: Question[];
}