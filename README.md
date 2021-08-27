# DEW Take Home Project
 DEW Take Home Project - Coding Challenge - Jerry Allan Akshay
 
## Running the Application

### Using GitHub
1. Pull the repository onto your machine.
2. Make sure you have angular CLI, NODEJS, and other relevant packages on your machine.
3. Change the current directory to <Pulled Repo>/dew-application-virtual/dew-app.
4. Run the command 'ng --open serve'
5. Your browser window should open up automatically. If not, use the address and portnumber specified on the command prompt.
 
### Using Docker
1. Install the Docker CLI on your machine.
2. Pull the Docker image using the command 'docker pull fallenaxeshay/dewapp:v2'
3. Run the docker image using the command 'docker run -v <path_to_pulled_application>/app -v /app/node_modules -p 4201:4200 --rm fallenaxeshay/dewapp:v2'.
5. Your browser window should open up automatically. If not, use the address and portnumber specified in the command (http://localhost:4201 in this case).
