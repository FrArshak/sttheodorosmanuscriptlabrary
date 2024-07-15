import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/auth.service";
import {CatalogService} from "../../shared/services/catalog.service";
import {CatalogItemType, CatalogType, SingleCatalogType} from "../../../types/catalog.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {PostService} from "../../shared/services/post.service";

@Component({
  selector: 'app-scripts-catalogs',
  templateUrl: './scripts-catalogs.component.html',
  styleUrl: './scripts-catalogs.component.scss'
})
export class ScriptsCatalogsComponent implements OnInit{

  isLogged: boolean = false;



  active: boolean = false;
  activeLocal: boolean = false;

  catalogs: CatalogItemType[] = [];

  update: boolean = false;

  updatedCatalog!: SingleCatalogType;

  id: number = 0;
  deletedObj!: {active: boolean ,id: number, type: string};

  totalAmount: number = 0;
  displayedCatalogs: CatalogItemType[] = [];

  loadingAmount: number = 3;

  loadMoreFlag: boolean = true;
  constructor(private authService: AuthService, private catalogService: CatalogService, private postService: PostService) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit(): void {
    this.loadCatalogs();
  }



  loadCatalogs() {
    this.catalogService.getCatalogs()
      .subscribe({
        next: (response: DefaultResponseType | CatalogType) => {
          if((response as DefaultResponseType).success === 0) {
            throw new Error((response as DefaultResponseType).message)
          }
          this.totalAmount = (response as CatalogType).totalCatalogs;
          console.log(this.totalAmount);
          this.catalogs = (response as CatalogType).catalogs
          this.loadMore();
        }
      })
  }
  loadMore() {
    if(this.totalAmount < 3) {
      this.loadingAmount = this.totalAmount;
      this.loadMoreFlag = false;
      for (let i = 0; i < this.loadingAmount; i++) {
        this.displayedCatalogs.push((this.catalogs as CatalogItemType[])[i]);
      }
      return;
    } else {
      for (let i = 0; i < this.loadingAmount; i++) {
        this.displayedCatalogs.push((this.catalogs as CatalogItemType[])[i]);
      }
      const remainingAmount = this.totalAmount = this.loadingAmount;
      if(remainingAmount <= 3) {
        if(remainingAmount === 1) {
          this.loadingAmount += 1;
        } else if(remainingAmount === 2) {
          this.loadingAmount +=2;
        } else if(remainingAmount === 3) {
          this.loadingAmount += 3;
          this.loadMoreFlag = false;
        }
      }
    }


    console.log(this.displayedCatalogs);

  }


  toggleActive(flag: boolean) {
    this.postService.updateData(flag);
    this.active = !this.active;
  }
  toggleLocalActive() {
    this.activeLocal = !this.activeLocal;
  }
  updateFlag() {
    this.update = !this.update;
  }
  getEditedCatalog(catalog: SingleCatalogType) {
    this.updatedCatalog = catalog;
    console.log(this.updatedCatalog)

  }
  getDeletedObj(data: boolean) {
    this.activeLocal = data;
  }

  getId(id: number) {
    this.id = id;
    this.catalogs = this.catalogs.filter(catalog => catalog.id !== id);
  }

}
