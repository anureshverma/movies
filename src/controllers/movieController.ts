import { Request, Response, } from 'express';
import * as movieService from '../services/movieService';

export const listMovies = async (req: Request, res: Response): Promise<void> => {
    try {
        const movies = await movieService.getAllMovies();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchMovies = async (req: Request, res: Response): Promise<void> => {
    const { query } = req.query;
    try {
        const movies = await movieService.searchMovies(query as string);
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addMovie = async (req: Request, res: Response): Promise<void> => {
    try {
        const movie = await movieService.createMovie(req.body);
        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateMovie = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const movie = await movieService.updateMovie(id, req.body);
        if (!movie) {
            res.status(404).json({ message: 'Movie not found' });
            return;
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteMovie = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await movieService.deleteMovie(id);
        res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
