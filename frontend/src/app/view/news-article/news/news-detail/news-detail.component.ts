import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.scss'
})
export class NewsDetailComponent implements OnInit{
  constructor() {
  }

  ngOnInit(): void {
    console.log('Edgar')
  }
}
