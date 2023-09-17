//# 저장소 계층과 연결하기
import { PostsRepository } from "../repositories/posts.repository.js"

export class PostsService {
    postsRepository = new PostsRepository();

    //* 게시글 조회 API
    findAllPosts = async () => {
        const posts = await this.postsRepository.findAllPosts();
        //! posts 에는 contents 와 password 가 함께 조회되기 때문에 아래에서 map 을 통해 두 값을 제외한 나머지를 출력함.

        // 게시글을 생성 날짜로 부터 내림차순으로 정렬함.
        //# 정렬작업 하기 sort 로 인해 원본이 정렬 됨!!
        posts.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });

        // password 와 content 를 뺀 상태로, controller 에게 Reponse를 전달한다.
        return posts.map((post) => {
            return {
                postId: post.postId,
                nickname: post.nickname,
                title: post.title,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt
            }
        })
    }

    //* 게시글 상세 조회 API
    findPostById = async (postId) => {
        //# 저장소에게 특정 게시글 하나를 요청합니다.
        const post = await this.postsRepository.findPostById(postId);

        return {
            postId: post.postId,
            nickname: post.nickname,
            title: post.title,
            content: post.content,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt
        };
    };



    //* 게시글 생성 API
    createPost = async (nickname, password, title, content) => {
        const createdPost = await this.postsRepository.createPost(
            nickname, password, title, content
        );

        return {
            postId: createdPost.postId,
            nickname: createdPost.nickname,
            title: createdPost.title,
            content: createdPost.content,
            createdAt: createdPost.createdAt,
            updatedAt: createdPost.updatedAt
        }

    }


    //* 게시글 수정 API
    updatePost = async (postId, password, title, content) => {
        //# 저장소에게 특정 게시글 하나를 요청합니다.
        const post = await this.postsRepository.findPostById(postId);
        if (!post) throw new Error('존재하지 않는 게시글 입니다.');

        //# 저장소에 에게 데이터 수정을 요청합니다.
        await this.postsRepository.updatePost(postId, password, title, content);

        //# 변경된 데이터를 조회합니다.
        const updatedPost = await this.postsRepository.findPostById(postId);

        return {
            postId: updatedPost.postId,
            nickname: updatedPost.nickname,
            title: updatedPost.title,
            content: updatedPost.content,
            createdAt: updatedPost.createdAt,
            updatedAt: updatedPost.updatedAt
        };
    };

    //* 게시글 삭제 API
    deletePost = async (postId, password) => {
        //# 저장소에 특정 게시글 하나를 요청합니다.
        const post = await this.postsRepository.findPostById(postId);
        if (!post) throw new Error('존재하지 않는 게시글 입니다.');

        //# 저장소에게 데이터 삭제를 요청합니다.
        await this.postsRepository.deletePost(postId, password);

        //! 89번 코드로 조회를 한 상태이기 때문에 삭제를 했어도 삭제 API 실행했어도 그 내용을 보여줄 수 있음. 다시 실행하면 if 문에 걸림.
        return {
            postId: post.postId,
            nickname: post.nickname,
            title: post.title,
            content: post.content,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt
        };
    };
}
