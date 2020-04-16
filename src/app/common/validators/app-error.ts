export class AppError {
    constructor(public originalError?: any){
        //originalError will contain the original error throw by the server
    }
}