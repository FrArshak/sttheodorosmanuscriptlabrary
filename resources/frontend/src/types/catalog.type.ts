export type CatalogType = {
  success: number,
  type: string,
  catalogs: CatalogItemType[],
  totalCatalogs: number
}
export type SingleCatalogType = {
  success: number,
  type: string,
  catalog: CatalogItemType[]
}

export type CatalogItemType = {
  id: number,
  catalog_title: string,
  catalog_text: string,
  pdf_path: string,
  image: string,
  created_at: string,
  updated_at: string
}
