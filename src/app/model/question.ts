import { MultipleChoiceAnswer } from "./multiple-choice-answer";

export interface Question {
	id: number;
	textualQuestion: string;
	active: boolean;
	graduateProgramId: number;
    multipleChoiceAnswers: MultipleChoiceAnswer[];
}