import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PostItemType, PostType} from "../../../../types/post.type";
import {AuthService} from "../../../core/auth.service";
import {PostService} from "../../services/post.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {


  @Input() post!: {title: string, text: string, id: number};

  @Output() active: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() update: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() support: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() supportPost: EventEmitter<PostItemType> = new EventEmitter<PostItemType>();
  @Output() postItem: EventEmitter<PostType> = new EventEmitter<PostType>();
  @Output() activeLocalEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() idEmitter: EventEmitter<number> = new EventEmitter<number>();

  isLogged: boolean = false;
  activeCalled: boolean = false;
  activeLocal: boolean = true;
  updateCalled: boolean = false;
  supportCalled: boolean = true;

  constructor(private authService: AuthService, private postService: PostService, private _snackBar: MatSnackBar) {

    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit() {

  }


  createCard() {
    this.toggleActive();
    this.updateCalled = false;
    this.update.emit(this.updateCalled);

  }

  editCard(id: number) {
    this.toggleActive();
    this.updateCalled = true;
    this.update.emit(this.updateCalled);
    try {
      this.postService.getPost(id)
        .subscribe({
          next: (post: DefaultResponseType | PostType) => {
            const postCard = (post as PostType);
            this.postItem.emit(postCard);
          },
          error: (error: HttpErrorResponse) => {
            this._snackBar.open(error.message);
          }
        });
    } catch(error) {
      console.log(error)
    }
  }


  toggleActive() {
    this.activeCalled = !this.activeCalled;
    this.active.emit(this.activeCalled);
  }
  deleteCatalog(id: number) {
    this.activeLocalEmitter.emit(this.activeLocal);
    this.idEmitter.emit(this.post.id)
  }

}
