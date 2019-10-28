# productivity-BE
Productivity BackEnd with Node.JS

[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)

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
* Get all the taks
  *  **GET** || http://**YOUR_SERVER_URL**/api/tasks/
* Search tasks by description text
  * **GET** || http://**YOUR_SERVER_URL**/api/tasks/search?q=**someText**
* Seed the server with 50 random taks
  * **GET** || http://**YOUR_SERVER_URL**/api/tasks/seed
* Get one task by id
  * **GET** || http://**YOUR_SERVER_URL**/api/tasks/:id
* Create one new task
  * **POST** || http://**YOUR_SERVER_URL**/api/tasks/
* Update one task by id
  * **PUT** || http://**YOUR_SERVER_URL**/api/tasks/:id
* Delete one task by id
  * **DELETE** || http://**YOUR_SERVER_URL**/api/tasks/:taskId
