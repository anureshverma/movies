import { Request, Response } from 'express';
import * as movieController from '../../src/controllers/movieController';
import * as movieService from '../../src/services/movieService';

jest.mock('../../src/services/movieService');

describe('Movie Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return all movies', async () => {
        const mockMovies = [{ title: 'Movie 1', genre: 'Action', rating: 8, streamingLink: 'link1' }];
        (movieService.getAllMovies as jest.Mock).mockResolvedValue(mockMovies);

        const req = {} as Request;
        const res = {
            json: jest.fn().mockImplementation((data) => data),
            status: jest.fn().mockReturnThis(),
        } as unknown as Response;

        await movieController.listMovies(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockMovies);
    });

    it('should search movies', async () => {
        const query = 'Action';
        const mockMovies = [{ title: 'Movie 1', genre: 'Action', rating: 8, streamingLink: 'link1' }];
        (movieService.searchMovies as jest.Mock).mockResolvedValue(mockMovies);

        const req = { query: { query } } as unknown as Request;
        const res = {
            json: jest.fn().mockImplementation((data) => data),
            status: jest.fn().mockReturnThis(),
        } as unknown as Response;

        await movieController.searchMovies(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockMovies);
    });

    it('should add a new movie', async () => {
        const movieData = {
            title: 'New Movie',
            genre: 'Action',
            rating: 8,
            streamingLink: 'https://example.com/movie',
        };
        (movieService.createMovie as jest.Mock).mockResolvedValue(movieData as any);

        const req = { body: movieData } as Request;
        const res = {
            json: jest.fn().mockImplementation((data) => data),
            status: jest.fn().mockReturnThis(),
        } as unknown as Response;

        await movieController.addMovie(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(movieData);
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

        const req = { params: { id: movieId }, body: movieData } as unknown as Request;
        const res = {
            json: jest.fn().mockImplementation((data) => data),
            status: jest.fn().mockReturnThis(),
        } as unknown as Response;

        await movieController.updateMovie(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(movieData);
    });

    it('should delete an existing movie', async () => {
        const movieId = '123';
        (movieService.deleteMovie as jest.Mock).mockResolvedValue(undefined);

        const req = { params: { id: movieId } } as unknown as Request;
        const res = {
            json: jest.fn().mockImplementation((data) => data),
            status: jest.fn().mockReturnThis(),
        } as unknown as Response;

        await movieController.deleteMovie(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Movie deleted successfully' });
    });
});
