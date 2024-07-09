import {Component, OnInit} from '@angular/core';
import {PostService} from "../../../../shared/services/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DefaultResponseType} from "../../../../../types/default-response.type";
import {PostItemType, PostType} from "../../../../../types/post.type";
import {HttpErrorResponse} from "@angular/common/http";
import {ActiveParamsType} from "../../../../../types/active-params.type";

@Component({
  selector: 'news-detail',
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.scss'
})
export class NewsDetailComponent implements OnInit {

  post!: PostItemType;

  posts: PostItemType[] = [];
  params: ActiveParamsType = {postType: '', take: 3, skip: 0}
  currentRoute: string = '';
  text: string = '<h1>Treasures of Armenian Manuscripts\n' +
    'Dive into the world of Armenian manuscripts, where history and art intertwine. These ancient documents preserve the rich cultural heritage and literary accomplishments of the Armenian people. Spanning centuries, they include religious texts, historical chronicles, and literary works that reflect the intellectual and artistic achievements of Armenia. Each manuscript offers a unique glimpse into the past, showcasing the vibrant traditions and enduring spirit of the Armenian civilization.\n' +
    '\n' +
    'Historical Significance\n' +
    'Armenian manuscripts are not just books; they are vital pieces of history that document the evolution of Armenian culture and identity. These manuscripts date back to as early as the 5th century, a period that marks the creation of the Armenian alphabet by Saint Mesrop Mashtots. This invention was a pivotal moment in Armenian history, allowing for the transcription of oral traditions, religious texts, and scholarly works.\n' +
    '\n' +
    'Religious Texts\n' +
    'One of the most significant categories of Armenian manuscripts is religious texts. These include beautifully illuminated Bibles, prayer books, and theological writings. The intricate illustrations and calligraphy in these texts not only serve a decorative purpose but also convey theological and moral lessons. The Armenian Church played a crucial role in preserving these manuscripts, which are considered sacred and are still used in liturgical practices today.\n' +
    '\n' +
    'Historical Chronicles\n' +
    'Armenian historical chronicles are invaluable resources that provide detailed accounts of the country\'s history, including its interactions with neighboring nations, internal conflicts, and significant events. These chronicles were often written by monks and scholars who meticulously recorded events as they unfolded. They offer a unique perspective on historical events from an Armenian viewpoint, making them essential for understanding the broader history of the region.</h1>'
  constructor(private router: Router, private postService: PostService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.currentRoute = this.router.url;
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
      if (this.currentRoute.includes('news')) {
        this.params.postType = 'news';

      } else if (this.currentRoute.includes('article')) {
        this.params.postType = 'articles';

      }
    });

    this.activatedRoute.params.subscribe(params => {
      this.postService.getPost(params['id'])
        .subscribe({
          next: (response: DefaultResponseType | PostType) => {
            if((response as DefaultResponseType).success === 0) {
              throw new Error((response as DefaultResponseType).message)
            }

            this.post = (response as PostType).post as PostItemType
            console.log(this.post)


            this.postService.getPosts(this.params)
              .subscribe({
                next: (response: DefaultResponseType | PostType) => {
                  if((response as DefaultResponseType).success === 0) {
                    throw new Error((response as DefaultResponseType).message)
                  }
                  this.posts = (response as PostType).posts as PostItemType[];
                },
                error: (error: HttpErrorResponse) => {

                }
              })
          },
          error: (error: HttpErrorResponse) => {
            throw new Error(error.message);
          }
        })
    })
  }
}
