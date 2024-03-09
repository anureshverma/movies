"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movieController_1 = require("../controllers/movieController");
const role_1 = require("../middlewares/role");
const router = express_1.default.Router();
router.get('/', movieController_1.listMovies);
router.get('/search', movieController_1.searchMovies);
router.post('/', [role_1.roleCheck], movieController_1.addMovie);
router.put('/:id', [role_1.roleCheck], movieController_1.updateMovie);
router.delete('/:id', [role_1.roleCheck], movieController_1.deleteMovie);
exports.default = router;
