export interface UserType{
    id:number,
    name:string,
    email:string
}
export interface userResponse{
    message:string,
    data:{
        user:UserType,
        token:string
    }
}

export interface userLogin{
    email?:string,
    password?:string
}