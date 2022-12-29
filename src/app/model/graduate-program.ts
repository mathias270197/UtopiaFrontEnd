import { Question } from "./question";

export interface GraduateProgram {
	id: number;
    name: string;
	active: boolean;
	facultyId: number;
	faculty: number;
	questions: Question[];
}