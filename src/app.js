import express from 'express';
import bodyParser from 'body-parser';
import i18n from 'i18n';
import routes from './routes';
import db from './config/database';
import secret from './config/secrets';

const app = express();


const expressSetting = () => {
    i18n.configure({
        locales: ['en', 'pt'],
        defaultLocale: 'pt',
        directory: './src/locales/',
        updateFiles: false,
        indent: '\t',
        extension: '.json'
    });
    app.use(i18n.init);
    app.use(bodyParser.json());
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        if ('OPTIONS' === req.method)
            res.send(200);
        else
            next(); 
    });
    app.use('/', routes);
    return app;
};

export default async () => {
    try{
        await db.connect();
        return expressSetting();
    } catch (error) {
        console.log(error);
    }
}