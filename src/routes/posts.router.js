//# 모든 의존성을 관리하는 장소

import express from 'express';

//# 의존성 주입하기 위해 prisma, PostsService, PostsRepository 등을 생성함.
import { prisma } from '../utils/prisma/index.js';
import { PostsController } from '../controllers/posts.controller.js'
import { PostsService } from '../services/posts.service.js';
import { PostsRepository } from '../repositories/posts.repository.js';

const router = express.Router();
//# 의존성을 위한 생성 코드
const postsRepository = new PostsRepository(prisma);
const postsService = new PostsService(postsRepository);
const postsController = new PostsController(postsService);

// const postsController = new PostsController(); // PostsController 를 인스턴스화 시킨다.

// 게시글 생성 API
router.post('', postsController.createPost); // 요청이 들어오면 해당하는 컨트롤러로 요청을 전달함.

// 게시글 조회 API
router.get('', postsController.getPosts);

// 게시글 상세 조회 API
router.get('/:postId', postsController.getPostById);

// 게시글 수정 API
router.put('/:postId', postsController.updatePost);

// 게시글 삭제 API
router.delete('/:postId', postsController.deletePost);


export default router;

