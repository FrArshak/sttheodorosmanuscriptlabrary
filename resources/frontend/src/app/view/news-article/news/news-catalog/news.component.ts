import {Component, EventEmitter, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import { AuthService } from "../../../../core/auth.service";
import { PostService } from "../../../../shared/services/post.service";
import {PostItemType, PostType} from "../../../../../types/post.type";
import { ActiveParamsType } from "../../../../../types/active-params.type";
import { DefaultResponseType } from "../../../../../types/default-response.type";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import {skip} from "rxjs";

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'] // Changed styleUrl to styleUrls
})
export class NewsComponent implements OnInit {

  @Output() activeLocalEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() idEmitter: EventEmitter<number> = new EventEmitter<number>();

  activeLocal: boolean = false;
  isLogged: boolean = false;
  title: string = '';
  subtitle: string = '';
  active: boolean = false;
  news: PostItemType[]  = []; // Changed to an array to hold multiple pages of posts

  pagesCount: number = 0;

  postsTotal: number = 0;

  activeParams: ActiveParamsType = { postType: '', skip: 0, take: 9 };

  activePage: number = 1;

  updateModalFlag: boolean = false;

  currentRoute: string = '';
  postItem!: PostType;

  id: number = 0;

  constructor(private authService: AuthService, private postService: PostService,
              private _snackBar: MatSnackBar, private router: Router,
              private activatedRoute: ActivatedRoute, private zone: NgZone) {
    this.isLogged = this.authService.getIsLoggedIn();
    this.checkTheRoute();
    this.postService.data$.subscribe(data => {
      this.updateModalFlag = data;
    })
  }

  ngOnInit() {
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
    });

    this.checkTheRoute();

    this.activatedRoute.queryParams.subscribe((params) => {

      if(params.hasOwnProperty('take')) {
        const take = params['take'];
        this.activePage = take / 9;
        this.changePage(this.activePage);
      }

      // this.loadPosts();
    });
  }

  checkTheRoute() {
    this.currentRoute = this.router.url;
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
      if (this.currentRoute.includes('news')) {
        this.activeParams.postType = 'news'
        this.title = 'News';
        this.subtitle = 'Fresh Discoveries and News on Armenian Manuscripts';
        this.loadPosts();
      } else if (this.currentRoute.includes('articles')) {
        this.title = 'Articles';
        this.subtitle = 'Fresh Discoveries and News on Armenian Manuscripts';
        this.activeParams.postType = 'articles';
        this.loadPosts()
      }
    });
  }

  loadPosts() {
    this.postService.getPosts(this.activeParams).subscribe({
      next: (response: PostType | DefaultResponseType) => {
        if ((response as DefaultResponseType).message) {
          this._snackBar.open((response as DefaultResponseType).message);
          return;
        }
        this.news = (response as PostType).posts as PostItemType[];
        this.postsTotal = (response as PostType).totalPost as number


        this.pagesCount = Math.ceil(this.postsTotal / 9);
      }
    });
  }

  goToPrev() {
    if(this.activePage === 1) {
      return
    }
    this.activePage--;
    this.changePage(this.activePage);
  }

  goToNext() {
    if(this.activePage >= this.pagesCount ) {
      return
    }
    this.activePage++
    this.changePage(this.activePage);
  }

  updateQueryParams() {
    this.router.navigate(['/news'], {
      queryParams: { skip: this.activeParams.skip, take: this.activeParams.take }
    });
    this.loadPosts();
  }

  toggleActive(updateFlag: boolean) {
    this.active = !this.active;
      this.postService.updateData(updateFlag)
  }
  getPagesArray(): number[] {
    return Array(this.pagesCount).fill(0).map((x, i) => i + 1);
  }

  changePage(page: number) {
    this.activeParams.skip = (page - 1) * 9
    this.activeParams.take = page * 9;
    this.activePage = page;
    this.updateQueryParams()
  }

  getPostItem(data: PostType) {
    this.postItem = data;
    console.log(this.postItem);
  }

  getUpdatedPost(post: PostItemType) {
    const updatedPost = this.news?.find(postItem => postItem.id === post.id);
    if(updatedPost) {
      updatedPost.post_en.title = post.post_en.title
      updatedPost.post_en.paragraph = post.post_en.paragraph
      updatedPost.post_am.title = post.post_am.title
      updatedPost.post_am.paragraph = post.post_am.paragraph
    }
  }

  getId(id: number) {
    this.id = id;
  }

  toggleActiveLocal() {
    this.activeLocal = !this.activeLocal;
  }


  // getCreatedPost(post: PostItemType) {
  //   // this.zone.run(() => {
  //   //   this.news.push(post);
  //   //   this.updateQueryParams();
  //   //   this.loadPosts();
  //   // });
  // }
}
