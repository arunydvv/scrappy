export enum TaskType{
    LAUNCH_BROWSER = "LAUNCH_BROWSER",
    PAGE_TO_HTML = "PAGE_TO_HTML",
}


export enum TaskParamsType{
    STRING = "STRING",
    BROWSER_INSTANCE = "BROWSER_INSTANCE",
}

export interface TaskParams{
    name: string;
    type: TaskParamsType;
    required?: boolean;
    hideHandle?: boolean;
    helperText?: string;
    [key:string]: any;
}