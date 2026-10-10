class CostumError extends Error {
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode
    }
}
module.export = CostumError;