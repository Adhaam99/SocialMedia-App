import { DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Posts } from '../../core/interfaces/posts';
import { PostsService } from '../../core/services/posts.service';
import { CommentComponent } from '../../shared/comment/comment.component';
import { UsersService } from '../../core/services/users.service';
import { User } from '../../core/interfaces/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe, CommentComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  allPosts: Posts[] = [];
  userData: User = {} as User;
  placeholder: string = ``
  content: string = '';

  getAllPostsApi!: Subscription;
  savedPostFile!: File;
  savedPhotoFile!: File;

  private readonly _PostsService = inject(PostsService);
  private readonly _UsersService = inject(UsersService);

  getAllPosts = () => {
    this.getAllPostsApi = this._PostsService.getAllPosts().subscribe({
      next: (res) => {
        console.log(res);
        this.allPosts = res.posts;
      },
    });
  };

  selectImage = (e: Event) => {
    const input = e.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.savedPostFile = input.files[0];
    }
  };

  getUserData = () => {
    this._UsersService.getUserData().subscribe({
      next: (res) => {
        console.log(res);
        this.userData = res.user
        this.placeholder = `What's in your mind, ${res.user.name}`
      },
    });
  };

  creatPost = () => {
    const formData = new FormData();

    formData.append('body', this.content);
    formData.append('image', this.savedPostFile);

    this._PostsService.createPost(formData).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  };

  ngOnInit(): void {
    this.getAllPosts();
    this.getUserData();
  }

  ngOnDestroy(): void {
    this.getAllPostsApi?.unsubscribe();
  }
}
