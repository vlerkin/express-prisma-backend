## Running the app
Make sure you have .env file with the following content ```DATABASE_URL="postgresql://postgres:password@localhost:5432/mydb"```
To bring the app alive use the command:

```docker-compose up --build```

## Check if the app works
To check if backend accepts requests and communicates to the database you can post a note or request all notes with the following commands:

```curl -X POST -H "Content-Type: application/json" -d '{"note": "Hello, World!"}' http://localhost:6001/note```

```curl http://localhost:6001/notes```
