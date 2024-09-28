export interface IPatient {
    formatDate(patients_started_date: Date): string;
    patients_id:               number;
    patients_name:             string;
    patients_surgery_type_id:  number;
    patients_started_date:     Date;
    patients_updated_date:     Date | null;
    patients_surgery_state_id: number;
    surgery_states:            SurgeryStates;
    surgery_type:              SurgeryType;
}

export interface SurgeryStates {
    surgery_state_id:   number;
    surgery_state_name: string;
}

export interface SurgeryType {
    surgery_type_id:   number;
    surgery_type_name: string;
}
