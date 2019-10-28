# productivity-BE
Productivity BackEnd with Node.JS

## Install
Run on terminal

```bash
npm install
```

for install the dependencies

## Config
You need to create a **.env** file based on **.env.example** and give data for connect to MongoDB, set the port and the **CORS** policies.

## Execution
### Devmode

```bash
  npm run dev
```

<!-- #### Test
```bash
  npm run test
``` -->

### Production

```bash
  npm start
```

### Routes
GET || http://<YOUR-SERVER-URL>/api/tasks/
GET || http://<YOUR-SERVER-URL>/api/tasks/search
GET || http://<YOUR-SERVER-URL>/api/tasks/seed
GET || http://<YOUR-SERVER-URL>/api/tasks/:id
POST || http://<YOUR-SERVER-URL>/api/tasks/
PUT || http://<YOUR-SERVER-URL>/api/tasks/:id
DELETE || http://<YOUR-SERVER-URL>/api/tasks/:taskId

[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)
