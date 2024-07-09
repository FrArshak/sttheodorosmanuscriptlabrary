import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CatalogService} from "../../services/catalog.service";
import {CommonModule} from "@angular/common";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {PostService} from "../../services/post.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit, OnChanges {

  @Input() active: boolean = false;
  @Input() id: number = 0;
  @Input() post: boolean = false;
  constructor(private catalogService: CatalogService, private postService: PostService, private _snackBar: MatSnackBar) {

  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  deleteSelected() {
    if(!this.post) {
      this.catalogService.deleteCatalog(this.id)
        .subscribe({
          next: (response: DefaultResponseType) => {
            if(response.success === 0) {
              throw new Error(response.message);
            }
            this._snackBar.open(response.message)
            this.active = false;
          }
        })
    } else if(this.post) {
      this.postService.deletePost(this.id)
        .subscribe({
          next: (response: DefaultResponseType) => {
            if(response.success === 0) {
              throw new Error(response.message);
            }
            this._snackBar.open(response.message + '. Please refresh the page!');
            this.active = false;
          }
        })
    }

  }
  closeModal() {
    this.active = false;
  }

}
