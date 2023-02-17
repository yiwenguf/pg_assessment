Prerequisites
- Docker
- Node version 19.6.0

Commands
- To setup MySQL db
  - Ensure docker is installed
  - Open terminal/cmd go to the /mysql folder
  - docker build -t yiweng_pg_db .
  - docker run -p 3306:3306 yiweng_pg_db

To run unit tests
- Open terminal/cmd in the project folder
- npm test

To start the backend
- Open terminal/cmd in the project folder
- npm start

Postman
- Included import file in the project main folder
  - pg_assessment_postman.json
