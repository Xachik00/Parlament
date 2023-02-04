export interface IParlament {
    id: number;
    title: string;
    description: string;
    img: string
}

export interface IDocCirculation {
    id: number,
    title:string,
    text: string,
    subtitle1?: string,
    subtitle2?: string,
}

export interface ICommittees {
    id: number,
    title: string,
    text: string
}

export interface IMPs {
    id: number,
    firstname: string,
    lastname: string,
    surname: string,
    phonenumber: string,
    key: boolean
}
        

export interface ICommittee {
    id: number,
    name: string,
    member1: string,
    member2: string,
    cityphone: string,
    internalphone: string,
    internalphone2: string
}

export interface IFraction {
    id: number,
    name: string,
    member1: string,
    member2: string,
    cityphone: string,
    internalphone: string,
}

export interface ITime {
    id: number;
    title?:string;
    name: string;
    day: string;
    time: string;
}

export interface IDepnumbers {
    id: number;
    name: string;
    internalphone: string;
}
export interface ICalendar {
    id:number;
    date: string;
    
}