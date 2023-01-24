export interface IParlament {
    id: number;
    title: string;
    description: string;
    img: string
}

export interface IDocCirculation {
    id: number,
    text: string,
    text_A?: string,
    text_B?: string,
}

export interface ICommittees {
    id: number,
    title: string,
    text: string
}

export interface IMPs {
    id: number,
    name: string,
    lastname: string,
    firstname: string,
    phonenumber: string,
    key: string
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
    leader: string,
    member: string,
    cityphone: string,
    internalphone: string,
}

export interface ITime {
    id: number;
    name: string;
    day: string;
    time: string;
}

export interface IDepnumbers {
    id: number;
    title: string;
    tel: string;
}
export interface ICalendar {
    id:number;
    day: string;
    
}