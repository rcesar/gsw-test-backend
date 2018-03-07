class MaxConcurrent {
    constructor () {
        this.maxConcurrent = 5;
        this.actualConnections = 0;
    }

    newConnection(){
        if(this.actualConnections < this.maxConcurrent){
            this.actualConnections++;
            return true;
        }else{
            return false;
        }
    }

    releaseConnection(){
        this.actualConnections--;
        return true;
    }
}

const maxConcurrent = module.exports = exports = new MaxConcurrent;