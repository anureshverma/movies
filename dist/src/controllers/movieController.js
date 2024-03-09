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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.updateMovie = exports.addMovie = exports.searchMovies = exports.listMovies = void 0;
const movieService = __importStar(require("../services/movieService"));
const listMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield movieService.getAllMovies();
        res.json(movies);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.listMovies = listMovies;
const searchMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query;
    try {
        const movies = yield movieService.searchMovies(query);
        res.json(movies);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.searchMovies = searchMovies;
const addMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield movieService.createMovie(req.body);
        res.status(201).json(movie);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.addMovie = addMovie;
const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const movie = yield movieService.updateMovie(id, req.body);
        if (!movie) {
            res.status(404).json({ message: 'Movie not found' });
            return;
        }
        res.json(movie);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.updateMovie = updateMovie;
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield movieService.deleteMovie(id);
        res.json({ message: 'Movie deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteMovie = deleteMovie;
