export interface MultipleChoiceAnswer {
	id: number;
	textualAnswer: string;
	active: boolean;
    correct: boolean;
	questionId: number;
	answers: number;
}