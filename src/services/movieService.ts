import Movie, { Movie as MovieType } from '../models/movie';

export const getAllMovies = async (): Promise<MovieType[]> => {
    return await Movie.find();
};

export const searchMovies = async (query: string): Promise<MovieType[]> => {
    return await Movie.find({
        $or: [
            { title: { $regex: query, $options: 'i' } },
            { genre: { $regex: query, $options: 'i' } },
        ],
    });
};

export const createMovie = async (movieData: MovieType): Promise<MovieType> => {
    const newMovie: MovieType = new Movie(movieData);
    return await newMovie.save();
};

export const updateMovie = async (id: string, movieData: Partial<MovieType>): Promise<MovieType | null> => {
    return await Movie.findByIdAndUpdate(id, movieData, { new: true });
};

export const deleteMovie = async (id: string): Promise<void> => {
    await Movie.findByIdAndDelete(id);
};
