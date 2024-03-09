# Environment Setup

## Node Version
- 18.18.2

## MongoDB Version
- latest MongoDB docker pull

## MongoDB Setup
- Run the following command to set up MongoDB container:
```bash
docker run -d --name monog_cont -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root mongo
```

# Clone the Repository and Run

```bash
git clone https://github.com/anureshverma/movies.git
cd movies
npm install
npm run start
```
# Test Run

```bash
npm run test
```

# Curls

## All Movies
```bash
curl --location 'http://localhost:3000/movies'
```

## Search By Genre
```bash
curl --location 'http://localhost:3000/movies/search?query=action'
```

## Add Movie
```bash
curl --location 'http://localhost:3000/movies?role=admin' \
--header 'Content-Type: application/json' \
--data '{
  "title": "MMM",
  "genre": "Action",
  "rating": 7.5,
  "streamingLink": "https://movies.com/movie"
}'
```

## Delete Movie
```bash
curl --location --request DELETE 'http://localhost:3000/movies/:movieId?role=admin'
```

## Update Movie
```bash
curl --location --request PUT 'http://localhost:3000/movies/:movieId?role=admin' \
--header 'Content-Type: application/json' \
--data '{
  "title": "KK tt",
  "genre": "LOve",
  "rating": 8.0,
  "streamingLink": "https://movies.com/kktt"
}'
```
