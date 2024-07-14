import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { BannerTextSliderComponent } from '../../shared/components/banner-text-slider/banner-text-slider.component';
import { SliderService } from '../../shared/services/slider.service';
import { ImageSliderComponent } from '../../shared/components/image-slider/image-slider.component';
import {AdminModalComponent} from "../../shared/components/admin-modal/admin-modal.component";
import {ContactFormComponent} from "../../shared/components/contact-form/contact-form.component";
import {LoaderComponent} from "../../shared/components/loader/loader.component";
import {SupportMissionComponent} from "../../shared/components/support-mission/support-mission.component";
import {PostItemType, PostType} from "../../../types/post.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {ActiveParamsType} from "../../../types/active-params.type";
import {PostService} from "../../shared/services/post.service";
import {CommonModule, NgForOf} from "@angular/common";
import {ModalComponent} from "../../shared/components/modal/modal.component";
import {AuthService} from "../../core/auth.service";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [BannerTextSliderComponent, ModalComponent, CommonModule, ImageSliderComponent, AdminModalComponent, ContactFormComponent, LoaderComponent, SupportMissionComponent, NgForOf],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  @Output() activeCalled: EventEmitter<boolean> = new EventEmitter<boolean>();

  isLogged: boolean = false;
  active: boolean = false;
  activeLocal: boolean = false;
  update: boolean = false;
  support: boolean = false;
  posts: PostItemType[] = [];
  params: ActiveParamsType = {postType:'support', take: 3, skip: 0};

  postItem!: PostType;
  id: number = 0;
  constructor(protected postService: PostService, protected authService: AuthService) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit() {
    this.postService.getPosts(this.params)
      .subscribe({
        next: (response: DefaultResponseType | PostType) => {
          if((response as DefaultResponseType).success === 0) {
            throw new Error((response as DefaultResponseType).message);
          }
          this.posts = (response as PostType).posts as PostItemType[];
        },
      });
  }

  toggleActive(flag: boolean) {
    this.postService.updateData(flag);
    this.active = !this.active;
  }
  toggleActiveLocal() {
    this.activeLocal = !this.activeLocal;
  }


  getActive(active: boolean) {
    this.active = active;
  }

  getUpdate(update: boolean) {
    this.update = update;
    console.log(this.update)
  }
  getSupportFlag(support: boolean) {
    this.support = support;
  }

  getPost(post: PostType) {
    this.postItem = post;
  }

  getId(id: number) {
    this.id = id;
  }

}
