import {Injectable} from '@nestjs/common';

import {PostDto} from "./dto/post.dto";
import {CreatePostDto} from "./dto/create-post.dto";
import {UpdatePostDto} from "./dto/update-post.dto";

@Injectable()
export class PostService {

    private posts: PostDto[] = [];

    getPosts(): PostDto[] {
        return this.posts
    }

    getPostById(id: string): PostDto {
        const post = this.posts.find(post => post.id === id);
        return post;
    }

    createPost(postDto: CreatePostDto): PostDto {
        const post = {
            id: String(new Date().getTime()),
            ...postDto,
        }
        this.posts.push(post);
        return post;
    }

    deletePostById(id: string): string {
        this.posts = this.posts.filter(post => post.id !== id);
        return `Post ${id} id successfully deleted`;
    }

    updatePostById(id: string, bodyToUpdate: UpdatePostDto): PostDto {
        this.posts = this.posts.map(post => post.id === id ? {...post, text: bodyToUpdate.text} : post);
        const post = this.posts.find(post => post.id === id);
        return post;
    }
}
