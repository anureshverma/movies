import request from 'supertest';
import app from '../../src/server';
import * as movieService from '../../src/services/movieService';

jest.mock('../../src/services/movieService');

describe('Movie Routes', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return all movies', async () => {
        const mockMovies = [{ title: 'Movie 1', genre: 'Action', rating: 8, streamingLink: 'link1' }];
        (movieService.getAllMovies as jest.Mock).mockResolvedValue(mockMovies);

        const response = await request(app).get('/movies');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockMovies);
    });

    it('should search movies', async () => {
        const query = 'Action';
        const mockMovies = [{ title: 'Movie 1', genre: 'Action', rating: 8, streamingLink: 'link1' }];
        (movieService.searchMovies as jest.Mock).mockResolvedValue(mockMovies);

        const response = await request(app).get(`/movies/search?query=${query}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockMovies);
    });

    it('should add a new movie', async () => {
        const movieData = {
            title: 'New Movie',
            genre: 'Action',
            rating: 8,
            streamingLink: 'https://example.com/movie',
        };
        (movieService.createMovie as jest.Mock).mockResolvedValue(movieData as any);

        const response = await request(app)
            .post('/movies?role=admin')
            .send(movieData)
            .set('Content-Type', 'application/json');

        expect(response.status).toBe(201);
        expect(response.body).toEqual(movieData);
    });

    it('should update an existing movie', async () => {
        const movieId = '123';
        const movieData = {
            title: 'Updated Movie Title',
            genre: 'Updated Genre',
            rating: 8.5,
            streamingLink: 'https://example.com/updated_movie',
        };
        (movieService.updateMovie as jest.Mock).mockResolvedValue(movieData as any);

        const response = await request(app)
            .put(`/movies/${movieId}?role=admin`)
            .send(movieData)
            .set('Content-Type', 'application/json');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(movieData);
    });

    it('should delete an existing movie', async () => {
        const movieId = '123';
        (movieService.deleteMovie as jest.Mock).mockResolvedValueOnce(undefined);

        const response = await request(app).delete(`/movies/${movieId}?role=admin`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Movie deleted successfully' });
    });
});
