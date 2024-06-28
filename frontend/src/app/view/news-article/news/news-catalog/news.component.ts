import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../core/auth.service";
import { PostService } from "../../../../shared/services/post.service";
import {PostItemType, PostType} from "../../../../../types/post.type";
import { ActiveParamsType } from "../../../../../types/active-params.type";
import { DefaultResponseType } from "../../../../../types/default-response.type";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'] // Changed styleUrl to styleUrls
})
export class NewsComponent implements OnInit {

  isLogged: boolean = false;
  active: boolean = false;

  news: PostItemType[] = []; // Changed to an array to hold multiple pages of posts

  currentPage: number = 1;
  pageSize: number = 9;
  hasMorePosts: boolean = true; // Flag to check if more posts are available

  activeParams: ActiveParamsType = { postType: 'news', skip: 0, take: 9 };

  constructor(private authService: AuthService, private postService: PostService,
              private _snackBar: MatSnackBar, private router: Router, private activatedRoute: ActivatedRoute) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit() {
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      this.currentPage = params['page'] ? +params['page'] : 1;
      this.activeParams.skip = (this.currentPage - 1) * this.pageSize;
      this.loadPosts();
    });

    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPosts(this.activeParams).subscribe({
      next: (response: PostType | DefaultResponseType) => {
        if ((response as DefaultResponseType).message) {
          this._snackBar.open((response as DefaultResponseType).message);
          return;
        }
        const posts = response as PostType;
        this.hasMorePosts = posts.posts.length === this.pageSize; // Check if the number of posts is equal to pageSize
        if (this.currentPage === 1) {
          this.news = posts.posts; // For the first page, replace the existing posts
        } else {
          this.news = [...this.news, ...posts.posts]; // For subsequent pages, append the new posts
        }
      }
    });
  }

  goToPrev() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateQueryParams();
    }
  }

  goToNext() {
    if (this.hasMorePosts) {
      this.currentPage++;
      this.updateQueryParams();
    }
  }

  updateQueryParams() {
    this.router.navigate(['/news'], {
      queryParams: { page: this.currentPage }
    });
  }

  toggleActive() {
    this.active = !this.active;
  }
}
