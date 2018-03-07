# GSW TEST Backend

### Informações

Servidor está rodando na porta 3000

### Tecnologias

Todas tecnologias que utilizada são open source:

* Node.JS
* Express
* Mongoose
* Mocha
* Chai
* Babel

### Dependencias

É Necessário ter instalado na maquina:
* MongoDB
* Node.JS v8+

### Instalação

Instalar as dependencias e dependencias de desenvolvimento e rodar o servidor

```sh
$ cd gsw-test-frontend
$ npm install
$ npm run dev
```

### Testes

Para rodar os testes utilize os seguintes comandos

```sh
$ cd gsw-test-frontend
$ npm test
```


### Configurações Locais

Caso haja a necessidade de configurar a conexão, alterar as informações no arquivo:
```
./src/config/database.js
```

E também no arquivo:
```
./package.json
```

em 

```
{
    ...,
    "scripts":{
        "test":MONGODB_URL=<ALTERAR AQUI> mocha --opts test/mocha.opts test/*_spec.js
    },
    ...
}
```
URL do mongo está pré setada como:
```
mongodb://localhost/gsw-test
```
