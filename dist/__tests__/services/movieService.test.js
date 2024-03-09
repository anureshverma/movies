"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const movie_1 = __importDefault(require("../../src/models/movie"));
const movieService = __importStar(require("../../src/services/movieService"));
jest.mock('../../src/models/movie');
describe('Movie Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should return all movies', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockMovies = [{ title: 'Movie 1', genre: 'Action', rating: 8, streamingLink: 'link1' }];
        jest.spyOn(movie_1.default, 'find').mockResolvedValue(mockMovies);
        const movies = yield movieService.getAllMovies();
        expect(movies).toEqual(mockMovies);
    }));
    it('should search movies by title or genre', () => __awaiter(void 0, void 0, void 0, function* () {
        const query = 'Action';
        const mockMovies = [{ title: 'Movie 1', genre: 'Action', rating: 8, streamingLink: 'link1' }];
        jest.spyOn(movie_1.default, 'find').mockResolvedValue(mockMovies);
        const movies = yield movieService.searchMovies(query);
        expect(movies).toEqual(mockMovies);
    }));
    it('should create a movie', () => __awaiter(void 0, void 0, void 0, function* () {
        const movieData = { title: 'Movie 1', genre: 'Action', rating: 8, streamingLink: 'link1' };
        const saveSpy = jest.spyOn(movie_1.default.prototype, 'save').mockResolvedValue(movieData);
        const movie = yield movieService.createMovie(movieData);
        expect(saveSpy).toHaveBeenCalledTimes(1);
        expect(movie).toEqual(movieData);
    }));
    it('should update a movie', () => __awaiter(void 0, void 0, void 0, function* () {
        const movieId = '123';
        const movieData = { title: 'Updated Movie', genre: 'Action', rating: 8, streamingLink: 'link1' };
        const mockUpdatedMovie = Object.assign({ _id: movieId }, movieData);
        jest.spyOn(movie_1.default, 'findByIdAndUpdate').mockResolvedValue(mockUpdatedMovie);
        const updatedMovie = yield movieService.updateMovie(movieId, movieData);
        expect(updatedMovie).toEqual(mockUpdatedMovie);
    }));
    it('should delete a movie', () => __awaiter(void 0, void 0, void 0, function* () {
        const movieId = '123';
        const deleteSpy = jest.spyOn(movie_1.default, 'findByIdAndDelete').mockResolvedValueOnce({});
        yield movieService.deleteMovie(movieId);
        expect(deleteSpy).toHaveBeenCalledWith(movieId);
    }));
});
