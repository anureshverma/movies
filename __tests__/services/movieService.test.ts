import Movie from '../../src/models/movie';
import * as movieService from '../../src/services/movieService';

jest.mock('../../src/models/movie');

describe('Movie Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return all movies', async () => {
        const mockMovies = [{ title: 'Movie 1', genre: 'Action', rating: 8, streamingLink: 'link1' }];
        jest.spyOn(Movie, 'find').mockResolvedValue(mockMovies);

        const movies = await movieService.getAllMovies();

        expect(movies).toEqual(mockMovies);
    });

    it('should search movies by title or genre', async () => {
        const query = 'Action';
        const mockMovies = [{ title: 'Movie 1', genre: 'Action', rating: 8, streamingLink: 'link1' }];
        jest.spyOn(Movie, 'find').mockResolvedValue(mockMovies);

        const movies = await movieService.searchMovies(query);

        expect(movies).toEqual(mockMovies);
    });

    it('should create a movie', async () => {
        const movieData: any = { title: 'Movie 1', genre: 'Action', rating: 8, streamingLink: 'link1' };
        const saveSpy = jest.spyOn(Movie.prototype, 'save').mockResolvedValue(movieData);

        const movie = await movieService.createMovie(movieData);

        expect(saveSpy).toHaveBeenCalledTimes(1);
        expect(movie).toEqual(movieData);
    });

    it('should update a movie', async () => {
        const movieId = '123';
        const movieData = { title: 'Updated Movie', genre: 'Action', rating: 8, streamingLink: 'link1' };
        const mockUpdatedMovie = { _id: movieId, ...movieData };
        jest.spyOn(Movie, 'findByIdAndUpdate').mockResolvedValue(mockUpdatedMovie as any);

        const updatedMovie = await movieService.updateMovie(movieId, movieData);

        expect(updatedMovie).toEqual(mockUpdatedMovie);
    });

    it('should delete a movie', async () => {
        const movieId = '123';
        const deleteSpy = jest.spyOn(Movie, 'findByIdAndDelete').mockResolvedValueOnce({} as any);

        await movieService.deleteMovie(movieId);

        expect(deleteSpy).toHaveBeenCalledWith(movieId);
    });
});
