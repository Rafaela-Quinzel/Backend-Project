export class MySqlError extends Error {

    constructor(
        public readonly statusCode: number = 500,
        public message: string = "An unexpected error ocurred"
    ) {
        super(message)
    }

    public static duplicateEntryHandler = (errorMessage: string) => {
        
        let message: string = "Email or nickname already registered"

        if (errorMessage.toLowerCase().includes("Duplicate entry")) {
            message 
        }

        return {
            statusCode: 409,
            message
        }
    }
}