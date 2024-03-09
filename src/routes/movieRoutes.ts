import express from 'express';
import { addMovie, deleteMovie, listMovies, searchMovies, updateMovie } from '../controllers/movieController';
import { roleCheck } from '../middlewares/role';

const router = express.Router();

router.get('/', listMovies);
router.get('/search', searchMovies);
router.post('/', [roleCheck], addMovie);
router.put('/:id', [roleCheck], updateMovie);
router.delete('/:id', [roleCheck], deleteMovie);

export default router;
