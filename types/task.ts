export enum TaskType{
    LAUNCH_BROWSER = "LAUNCH_BROWSER"
}


export enum TaskParamsType{
    STRING = "STRING"
}

export interface TaskParams{
    name: string;
    type: TaskParamsType;
    required?: boolean;
    hideHandle?: boolean;
    helperText?: string;
    [key:string]: any;
}