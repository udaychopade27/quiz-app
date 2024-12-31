import { Router } from "express";
import multer from "multer";
import { keycloak } from "../utils/firebase-init.js";

import { createQuiz,getQuiz,updateQuiz,getQuizBySlug,deleteQuiz ,uploadImg} from "../controllers/quizController.js";
const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

// Public routes
router.get('/', getQuiz);
router.get('/:slug', getQuizBySlug);

// Protected routes
router.post('/upload', keycloak.protect(), upload.single('image'), uploadImg);
router.post('/new', keycloak.protect(), createQuiz);
router.put('/:slug', keycloak.protect(), updateQuiz);
router.delete('/:slug', keycloak.protect(), deleteQuiz);

export default router;
