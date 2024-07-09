import {Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import { LoaderService} from "../../services/loader.service";
import { Subscription } from 'rxjs';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, AfterViewInit {
  isShowed: boolean = false;

  constructor(private loaderService: LoaderService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.loaderService.$loading.subscribe((isShowed: boolean) => {
      this.isShowed = isShowed;
    });
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

}
