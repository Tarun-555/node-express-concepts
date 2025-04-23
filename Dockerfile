# this is base image node 22 for running our node app we require node
FROM node:22-alpine3.18  

# set the working directory in docker container
WORKDIR /app

# copy package.json and package-lock.json to the working directory
COPY package*.json ./

# environment variable to be used in the app, but this way this secrets will still be visible to others when pushed to git
# ENV DB_USER=""
# ENV DB_HOST="host.docker.internal" 
# ENV DB_NAME=""
# ENV DB_PASSWORD=""
# ENV DB_PORT=
# ENV POSTGRES_URL= ""
#instead we can use --env-file .env to make env file get variables while running container

# install dependencies
RUN npm install

# copy all files from the current directory to the working directory
# note: we are copying all the file after npm install command because if any change in files other than package.json we don't 
# want npm install to be executed. Since if any step in docker file changes then docker will re-run all the steps after that step we rebuilded
COPY . /app

# expose the port on which the app will run
EXPOSE 4000

# command to run the app
CMD ["node", "index.js"]

