# Grocery Express Service
Springboot application with mysql database and react app frontend as web. 

# Quickstart
```
clean:
docker-compose -p gatech -f docker-compose.yml down

build frontend image:
docker build -t gatech/backend -f ./images/Dockerfile.backend ./backend

build backend image:
docker build -t gatech/frontend -f ./images/Dockerfile.frontend ./frontend

start running backend and db:
docker-compose -p gatech -f docker-compose.yml up -d

One more step to launch frontend:
docker run -it -p 4321:3000 docker.io/gatech/frontend 
```
# Frontend
After launch, our react app will be deployed on port 4321 You should be able to navigate to http://localhost:4321 to view the page.
Signup and login will be required to access role-based pages with different functionalities. Our functional modification - `Return` will be located at User page, so sign up and log in as User role will be needed to access the return function.

# Backend
Communication with database is thru JPA hibernate, configuration could be viewed in the `application.properties` file.
Jwt Authentication and authorization is implemented with Spring security 

# Database
The database is mysql:8.0.31
