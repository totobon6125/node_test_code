//# 비지니스 계층과 연결하기
import { PostsService } from "../services/posts.service.js";

//# Post의 컨트롤러(Controller) 역할을 하는 클래스
export class PostsController {
    //* Post 서비스 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.
    postsService = new PostsService();


    //* 게시글 생성 API
    // 클라이언트에게 전달받는 데이터 있음
    createPost = async (req, res, next) => {
        try {
            // 클라이언트에개 전달받은 데이터를 객체구조 분해 할당 함.
            const { nickname, password, title, content } = req.body;

            const createPost = await this.postsService.createPost(
                nickname, password, title, content
            );

            return res.status(200).json({ data: createPost })
        } catch (err) {
            next(err)
        }
    }


    //* 게시글 조회 API
    //클라이언트에게 전달받는 데이터 없음
    getPosts = async (req, res, next) => {
        try {
            const posts = await this.postsService.findAllPosts();

            return res.status(200).json({ data: posts });
        } catch (err) {
            next(err);
        }
    }


    //*  게시글 상세 조회 API
    //클라이언트에게 전달받는 데이터 없지만 param 에서 postId 값을 받아와야 함.
    getPostById = async (req, res, next) => {
        try {
            const { postId } = req.params;

            //# 서비스 계층에 구현된 findPostById 로직을 실행
            const post = await this.postsService.findPostById(postId);

            return res.status(200).json({ data: post });
        } catch (err) {
            next(err);
        }
    }


    //*  게시글 수정 API
    updatePost = async (req, res, next) => {
        try {
            const { postId } = req.params;
            const { password, title, content } = req.body;

            //# 서비스 계층에 구현된 updatePost 로직을 실행
            const updatedPost = await this.postsService.updatePost(postId, password, title, content);

            return res.status(200).json({ data: updatedPost });
        } catch (err) {
            next(err);
        }
    }


    //*  게시글 삭제 API
    deletePost = async (req, res, next) => {
        try {
            const { postId } = req.params;
            const { password } = req.body;

            //# 서비스 계층에 구현된 deletePost 로직을 실행
            const deletedPost = await this.postsService.deletePost(postId, password);

            return res.status(200).json({ data: deletedPost });
        } catch (err) {
            next(err);
        }
    }
}
