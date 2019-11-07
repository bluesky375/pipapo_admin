import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Category, Product } from '../interfaces/model';
import { ProductService } from '../services/product/product.service';
import { CategoryService } from '../services/category/category.service';
import { API_BASE_URL } from '../config/config';
import { ToastrService } from 'ngx-toastr';
import { Headers, Http } from '@angular/http';

import { MatDialog} from '@angular/material';
import { DeleteConfirmModalComponent } from '../delete-confirm-modal/delete-confirm-modal.component';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productDisplayedColumns: string[] = ['logo', 'name', 'description', 'price', 'category', 'portion', 'actions'];
  categoryDisplayedColumns: string[] = ['icon', 'image', 'name', 'actions'];
  product_list: any[];
  category_list: any[];
  productDataSource: any;
  categoryDataSource: any;
  @ViewChild('productPaginator', { static: true }) productPaginator: MatPaginator;
  @ViewChild('categoryPaginator', { static: true }) categoryPaginator: MatPaginator;

  @ViewChild('productModal', { static: true }) productModal;
  private modalRef;

  editCategoryModalTitle: string;
  selectedIconFile: File = null;
  selectedImageFile: File = null;
  category_name: string = null;
  @ViewChild('ImageInput', { static: true }) ImageInput: ElementRef;
  @ViewChild('IconInput', { static: true }) IconInput: ElementRef;
  selectedCategoryId: number = 0;

  toggleTrigger: boolean;  // true: for product list , false: for category list
  base_url: string;

  constructor(private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private http: Http) { }

  ngOnInit() {
    this.toggleTrigger = true;
    this.base_url = API_BASE_URL;
    this.getAllProductList();
    this.getAllCategoryList();
  }


  onSelectedIndexChange($e) {
    if ($e == 0) {
      this.toggleTrigger = true;
    } else {
      this.toggleTrigger = false;
    }
  }

  openModal(id, kind): void {
    const dialogRef = this.dialog.open(DeleteConfirmModalComponent, {
      width: '450px',
      data: { id: id, kind: kind }
    });
    dialogRef.afterClosed().subscribe(res => {
      if(kind=="product"){
        this.getAllProductList();
      }else if(kind=="category"){
        this.getAllCategoryList();
      }
     
    });
  }

  setCategoryIdForEdit(id: number) {
    if (id == 0) {
      this.editCategoryModalTitle = "Create New Categroy";
      this.selectedCategoryId = id;
    } else {
      this.editCategoryModalTitle = "Edit Categroy";
      this.selectedCategoryId = id;
      this.categoryService.getCategoryById(id).subscribe(data => {
        let res = JSON.parse(data['_body']);
        this.category_name = res.data.name;
      });
    }
  }


  onIconFileSelected(event) {
    this.selectedIconFile = <File>event.target.files[0];
  }

  onImageFileSelected(event) {
    this.selectedImageFile = <File>event.target.files[0];
  }

  onInitInputElements() {
    this.category_name = null;
    this.ImageInput.nativeElement.value = '';
    this.IconInput.nativeElement.value = '';
    this.selectedIconFile = null;
    this.selectedImageFile = null;
  }

  onSave() {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'));
    if (this.selectedCategoryId == 0) {  // create

      this.http.post(API_BASE_URL + '/categories', { 'name': this.category_name }, { headers: headers }).subscribe(data => {
        let res = JSON.parse(data['_body']);

        if (res.success) {
          this.selectedCategoryId = res.data.id;
          const fd = new FormData();
          if (this.selectedIconFile || this.selectedImageFile) {  // Icon file upload  

            if (this.selectedIconFile) {
              fd.append('icon', this.selectedIconFile, this.selectedIconFile.name);
            }

            if (this.selectedImageFile) {
              fd.append('image', this.selectedImageFile, this.selectedImageFile.name);
            }

            this.http.post(API_BASE_URL + '/categories/upload/' + this.selectedCategoryId, fd, { headers: headers }).subscribe(data => {
              let res = JSON.parse(data['_body']);
              if (res.success) {
                this.toastrService.success('New Category is saved successfully');
                this.onInitInputElements();
                this.getAllCategoryList();
              } else {
                this.toastrService.error('Image upload failed!');
              }
            });
          } else {
            this.toastrService.success('New Category is saved successfully');
            this.onInitInputElements();
            this.getAllCategoryList();
          }

        } else {
          this.toastrService.error('Please enter category name');
        }
      });
    } else {                             // update
      this.http.put(API_BASE_URL + '/categories/' + this.selectedCategoryId, { 'name': this.category_name }, { headers: headers }).subscribe(data => {
        let res = JSON.parse(data['_body']);

        if (res.success) {
          const fd = new FormData();
          if (this.selectedIconFile || this.selectedImageFile) {  // Icon file upload  

            if (this.selectedIconFile) {
              fd.append('icon', this.selectedIconFile, this.selectedIconFile.name);
            }

            if (this.selectedImageFile) {
              fd.append('image', this.selectedImageFile, this.selectedImageFile.name);
            }

            this.http.post(API_BASE_URL + '/categories/upload/' + this.selectedCategoryId, fd, { headers: headers }).subscribe(data => {
              let res = JSON.parse(data['_body']);
              if (res.success) {
                this.toastrService.success('Category was updated  successfully');
                this.onInitInputElements();
                this.getAllCategoryList();
              } else {
                this.toastrService.error('Image updating  failed!');
              }
            });
          } else {
            this.toastrService.success('Category was updated successfully');
            this.onInitInputElements();
            this.getAllCategoryList();
          }

        } else {
          this.toastrService.error('Please enter category name');
        }
      });
    }
  }

  getAllCategoryList() {
    this.categoryService.getAllCategories().subscribe(data => {
      let res = JSON.parse(data['_body']);
      this.category_list = res.data;
      this.categoryDataSource = new MatTableDataSource<Category>(this.category_list);
      this.categoryDataSource.paginator = this.categoryPaginator;
    });
  }

  getAllProductList() {
    this.productService.getAllProducts().subscribe(data => {
      let res = JSON.parse(data['_body']);
      this.product_list = res.data;
      this.productDataSource = new MatTableDataSource<Product>(this.product_list);
      this.productDataSource.paginator = this.productPaginator;
    });
  }

  onCancel(){
    this.onInitInputElements();
  }
}



