import { DatePipe } from '@angular/common';
import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Comment } from '../../core/interfaces/comment';
import { CommentsService } from '../../core/services/comments.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent implements OnInit, OnDestroy {
  getPostCommentsApi!: Subscription;
  postComments: Comment[] = [];

  @Input({ required: true }) postId!: string;

  private readonly _CommentsService = inject(CommentsService);
  private readonly _FormBuilder = inject(FormBuilder);

  commentForm !: FormGroup;
 

  getPostComments = () => {
    this.getPostCommentsApi = this._CommentsService
      .getPostComments(this.postId)
      .subscribe({
        next: (res) => {
          console.log(`postId ${this.postId}`, res.comments);
          this.postComments = res.comments;
        },
      });
  };

  submitComment = () => {
    this._CommentsService.createComment(this.commentForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.postComments = res.comments.reverse();
        this.commentForm.get('content')?.reset()
      },
    });
  };

  deleteComment = (id:string) => {

    this._CommentsService.deleteComment(id).subscribe({
      next: (res) => {
        console.log(res)
      }
    })
  }

  ngOnInit(): void {

   this.commentForm = this._FormBuilder.group({
      content: [null, Validators.required],
      post: [ this.postId ],
    });
    this.getPostComments();
  }

  ngOnDestroy(): void {
    this.getPostCommentsApi?.unsubscribe();
  }
}
