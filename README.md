## Test Accounting Server

Clone the project

* Configure .env file for a dev or production enviroment

### Installations

```sh
$ npm install 
```

### Run on dev enviroment

```sh
$ npm run dev 
```

### Run on production enviroment (DOCKER)

```sh
$ docker build -t lrojas/account-api .
$ docker run -p 8080:8000 -d lrojas/account-api
```