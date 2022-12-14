import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/domains/Product';
import { ProductsService } from './products.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { StoreFormComponent } from '../new-store-dialog/store-form/store-form.component';
import { Router } from '@angular/router';
import { StoreDetails } from 'src/app/domains/StoreDetails';
import { ExistingStoreDialogComponent } from '../existing-store-dialog/existing-store-dialog.component';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  products: Product[];
  link : string;
  storeDetails: StoreDetails;

  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.displayProductsOnLoad();
  }

  displayProductsOnLoad(){
    this.productsService.getAllProducts().subscribe(data => {
      this.products = data as Product[];
      console.log(this.products);
    })

  }

  newShopDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.width = '600px';
    dialogConfig.height = '500px';
    dialogConfig.data = {

    }
    this.dialog.open(StoreFormComponent, dialogConfig)
    .afterClosed().subscribe(data => {
      this.router.navigate(['/app-store-landing-page'], {
        queryParams: {
          "shopName": data.data.shopName,
          "productCategory": data.data.productCategory,  
          "firstName": data.data.firstName,
          "lastName": data.data.lastName,
          "openTime": data.data.openTime,
          "closeTime": data.data.closeTime
        }
      })
    })
  }

  existingStoreDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.width = '600px';
    dialogConfig.height = '500px';
    dialogConfig.data = {}

    this.dialog.open(ExistingStoreDialogComponent, dialogConfig)
    .afterClosed().subscribe(data => {
      this.router.navigate(['/app-store-landing-page'], {
        queryParams:{
          "firstName":data.data.firstName,
          "lastName": data.data.lastName,
          "shopName": data.data.shopName
        }
      });
    })
  }

}
