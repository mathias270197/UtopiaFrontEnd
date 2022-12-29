import { GraduateProgram } from "./graduate-program";

export interface Faculty {
	id: number;
    name: string;
	active: boolean;
	graduatePrograms: GraduateProgram[];
}