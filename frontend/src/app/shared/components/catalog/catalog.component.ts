import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output, SimpleChanges
} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../core/auth.service";
import {CatalogItemType, CatalogType, SingleCatalogType} from "../../../../types/catalog.type";
import moment from "moment/moment";
import {TruncatePipe} from "../../pipes/truncate.pipe";
import {SafeHtml} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {CatalogService} from "../../services/catalog.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'catalog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ModalComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit, AfterViewInit, OnChanges{

  @Input() catalog!: CatalogItemType;

  @Output() updateCalled: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() catalogItemEmitter: EventEmitter<SingleCatalogType> = new EventEmitter<SingleCatalogType>()
  @Output() activeEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() activeLocalEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() idEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output() sendDeletedObj: EventEmitter<any> = new EventEmitter<any>();

  active: boolean = true;
  activeLocal: boolean = true;
  catalogItem!: SingleCatalogType;
  update: boolean = false;
  truncatedText!: SafeHtml;
  formattedDate: string = '';


  isLogged: boolean = false;
  constructor(private _snackBar: MatSnackBar,
              private authService: AuthService,
              private truncatePipe: TruncatePipe,
              private catalogService: CatalogService) {

    this.isLogged = this.authService.getIsLoggedIn();
  }
  ngOnInit() {
 // Output: 27 June 2024

  }

  ngAfterViewInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['catalog']) {
      const originalDate = this.catalog.created_at;
      this.formattedDate = moment(originalDate).format('DD MMMM YYYY');
      console.log(this.formattedDate);
    }
  }

  updateCatalog(id: number) {

    this.update = true;
    this.updateCalled.emit(this.update);
    this.activeEmitter.emit(this.active);
    this.catalogService.getCatalog(id)
      .subscribe({
        next: (response: SingleCatalogType | DefaultResponseType) => {
          if((response as DefaultResponseType).success === 0) {
            throw new Error((response as DefaultResponseType).message)
          }
          this.catalogItem = response as SingleCatalogType;
          console.log(this.catalogItem);
          this.catalogItemEmitter.emit(this.catalogItem);
        },
        error: (error: HttpErrorResponse) => {
          throw new Error(error.message);
        }
      })

  }
  deleteCatalog() {
  this.activeLocalEmitter.emit(this.activeLocal);
  this.idEmitter.emit(this.catalog.id)
  }


}
