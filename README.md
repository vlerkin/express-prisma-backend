## What to do to make it work
You need to do a few things before you can run containers with backend and database and integrate them with the frontend you created.

1. Create a Dockerfile to containerise the backend app; use ```node:16``` image as a base, add a step to generate a prisma client ```RUN npx prisma generate``` and expose port ```6001```.
2. Create ```compose.yml``` file; for database use ```postgres:13``` image, postgres always communicates on port 5432, add a healthcheck to the database so backend runs only if database is up and running:

```healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5```
```
Then to the backend service section add ```depends_on:``` section and define it so that it expect a condition of the database service to be healthy.
Don't forget to mount volumes.

Your backend service also will need an instruction on how to reach the database, so you need to add

```environment:
      DATABASE_URL: "postgresql://postgres:password@db:5432/mydb"```

## Running the app
Make sure you have .env file with the following content ```DATABASE_URL="postgresql://postgres:password@localhost:5432/mydb"```
To bring the app alive use the command:

```docker-compose up --build```

As all containers are up we need to create database tables and relations, use the following command before moving forward:

```npx prisma migrate dev --name init```

Since migrations are already created, you might try and proceed to the next section, in case you get error, you can delete ```migrations``` directory.
In case something goes wrong, you can delete existing containers with the command

```docker-compose down```

And also don't forget to remove volume you mounted:

```docker volume rm express-prisma-backend_postgres_data```

## Check if the app works
To check if backend accepts requests and communicates to the database you can post a note or request all notes with the following commands:

```curl -X POST -H "Content-Type: application/json" -d '{"note": "Hello, World!"}' http://localhost:6001/note```

```curl http://localhost:6001/notes```
