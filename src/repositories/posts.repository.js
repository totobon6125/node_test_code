import { PostsController } from '../controllers/posts.controller.js';
import { prisma } from '../utils/prisma/index.js'

export class PostsRepository {
    //* 게시글 생성 API
    createPost = async (nickname, password, title, content) => {
        const createdPost = await prisma.posts.create({
            data: {
                nickname, password, title, content
            }
        });
        return createdPost;
    };


    //* 게시글 조회 API
    findAllPosts = async () => {
        const posts = await prisma.posts.findMany();

        return posts;
    }

    //* 게시글 상세 조회 API
    findPostById = async (postId) => {
        //# ORM인 Prisma에서 Posts 모델의 findUnique 메서드를 사용해 데이터를 요청합니다.
        const post = await prisma.posts.findUnique({
            where: { postId: +postId },
        });

        return post;
    }


    //* 게시글 수정 API
    updatePost = async (postId, password, title, content) => {
        //# ORM인 Prisma에서 Posts 모델의 update 메서드를 사용해 데이터를 수정합니다.
        const updatedPost = await prisma.posts.update({
            where: {
                postId: +postId,
                password: password
            },
            //# 사용자에게 받은 정보.
            data: {
                title,
                content
            },
        });

        return updatedPost;
    };


    //* 게시글 삭제 API
    deletePost = async (postId, password) => {
        //# ORM인 Prisma에서 Posts 모델의 delete 메서드를 사용해 데이터를 삭제합니다.
        const deletedPost = await prisma.posts.delete({
            where: {
                postId: +postId,
                password: password
            },
        });

        return deletedPost;
    }
}