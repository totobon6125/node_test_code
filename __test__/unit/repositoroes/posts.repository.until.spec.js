// __tests__/unit/posts.repository.unit.spec.js

import { jest } from '@jest/globals';
import { PostsRepository } from '../../../src/repositories/posts.repository';

// Prisma 클라이언트에서는 아래 5개의 메서드만 사용합니다.
let mockPrisma = {
    posts: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
};

let postsRepository = new PostsRepository(mockPrisma);

describe('Posts Repository Unit Test', () => {

    // 각 test가 실행되기 전에 실행됩니다.
    beforeEach(() => {
        jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
    })

    //* 게시글 조회 test code
    test('findAllPosts Method', async () => {
        // TODO: 여기에 코드를 작성해야합니다.
        const mockReturn = 'findMany String';
        mockPrisma.posts.findMany.mockReturnValue(mockReturn);

        const posts = await postsRepository.findAllPosts();

        // findMany 함수의 반환값은 findAllPosts의 반환값과 같다.
        expect(posts).toBe(mockReturn);

        // findMany 함수는 최종적으로 1번만 호출된다.
        expect(postsRepository.prisma.posts.findMany).toHaveBeenCalledTimes(1);
    });

    //* 게시글 생성 test code
    test('createPost Method', async () => {
        // TODO: 여기에 코드를 작성해야합니다.
        // 1. 최종적으로 createPost 매서드의 반환값을 설정한다.
        const mockReturn = 'create Post Return String'
        mockPrisma.posts.create.mockReturnValue(mockReturn)

        // 2. createPost 매서드를 실행하기 위한, nickname, poassword, title, content 의 데이터를 전달한다.
        const createPostParams = {
            nickname: 'createPostNickname',
            password: 'createPostPassword',
            title: 'createPostTitle',
            content: 'createPostContent'
        }

        const createPostData = await postsRepository.createPost(
            createPostParams.nickname,
            createPostParams.password,
            createPostParams.title,
            createPostParams.content
        );

        //# create 매서드의 반환값은 Return 값과 동일하다.
        expect(createPostData).toEqual(mockReturn);

        //# create 매서드는 1번만 실행된다.
        expect(mockPrisma.posts.create).toHaveBeenCalledTimes(1);

        //# createPost 매서드를 실행할 때, creat 매서드는 전달한 nickname, password, title, content 가 순서대로 전달된다.
        expect(mockPrisma.posts.create).toHaveBeenCalledWith({
            data: {
                nickname: createPostParams.nickname,
                password: createPostParams.password,
                title: createPostParams.title,
                content: createPostParams.content
            }
        })
    });

});