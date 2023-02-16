Prerequisites
- Docker
- Node version 19.6.0

Commands
- To setup MySQL db
  - Ensure docker is installed
  - Open terminal/cmd go to the /mysql folder
  - docker build -t yiweng_pg_db .
  - docker run -p 3306:3306 yiweng_pg_db

To run tests
- Open terminal/cmd in the project folder
- npm test
- Test includes unit tests and api tests

To start the backend
- Open terminal/cmd in the project folder
- npm tsc
- cd build
- node index.js

Postman
- Included import file in the project main folder
  - pg_assessment_postman.json
