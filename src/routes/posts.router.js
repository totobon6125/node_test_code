import express from 'express';

import { PostsController } from '../controllers/posts.controller.js'

const router = express.Router();
const postsController = new PostsController(); // PostsController 를 인스턴스화 시킨다.

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
