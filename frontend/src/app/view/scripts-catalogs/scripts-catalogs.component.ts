import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/auth.service";
import {CatalogService} from "../../shared/services/catalog.service";
import {CatalogItemType, CatalogType, SingleCatalogType} from "../../../types/catalog.type";
import {DefaultResponseType} from "../../../types/default-response.type";

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
  constructor(private authService: AuthService, private catalogService: CatalogService) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit(): void {
    this.catalogService.getCatalogs()
      .subscribe({
        next: (response: DefaultResponseType | CatalogType) => {
          if((response as DefaultResponseType).success === 0) {
            throw new Error((response as DefaultResponseType).message)
          }
          this.catalogs = (response as CatalogType).catalogs
        }
      })
  }

  toggleActive() {
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
