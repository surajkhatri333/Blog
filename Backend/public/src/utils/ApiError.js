class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack =""
    ){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.suceess= false;
        this.errors =this.errors;
        
        if(stack){
            this.stack = stack;
        }
        else{
            Error.captureStackTrace(this,this.constructor);
        }
    }
}

export {ApiError};