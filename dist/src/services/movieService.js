"use strict";
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
exports.deleteMovie = exports.updateMovie = exports.createMovie = exports.searchMovies = exports.getAllMovies = void 0;
const movie_1 = __importDefault(require("../models/movie"));
const getAllMovies = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield movie_1.default.find();
});
exports.getAllMovies = getAllMovies;
const searchMovies = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield movie_1.default.find({
        $or: [
            { title: { $regex: query, $options: 'i' } },
            { genre: { $regex: query, $options: 'i' } },
        ],
    });
});
exports.searchMovies = searchMovies;
const createMovie = (movieData) => __awaiter(void 0, void 0, void 0, function* () {
    const newMovie = new movie_1.default(movieData);
    return yield newMovie.save();
});
exports.createMovie = createMovie;
const updateMovie = (id, movieData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield movie_1.default.findByIdAndUpdate(id, movieData, { new: true });
});
exports.updateMovie = updateMovie;
const deleteMovie = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield movie_1.default.findByIdAndDelete(id);
});
exports.deleteMovie = deleteMovie;
