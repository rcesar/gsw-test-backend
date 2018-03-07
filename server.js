import initApp from './src/app';
const http = require('http');

const init = async () => { 
    try{
        const app = await initApp();
        const port = 3000;
        const server = http.createServer(app);
        server.maxConnections = 2;
        server.listen(port);
        console.log(`app running on port ${port}`)
    } catch (error){
        console.log(error);
        process.exit(1);
    }
};

init();


