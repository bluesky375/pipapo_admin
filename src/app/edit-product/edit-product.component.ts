import { Component, OnInit, ChangeDetectorRef, AfterContentChecked , ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category/category.service';
import { ProductService } from '../services/product/product.service';
import { Headers, Http } from '@angular/http';
import { API_BASE_URL } from '../config/config';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})

export class EditProductComponent implements OnInit, AfterContentChecked {

  paramId: number;
  title: string;
  category_list: any[];
  product = { name: '', category_id: null, description: null, price: null, portion_size: null };

  category_id: number = null;
  product_name: string = null;
  product_description: string = null;
  product_price: number = null;
  product_portion_size: number = null;

  selectedFile: File = null;

  @ViewChild('ImageInput', {static: true}) ImageInput : ElementRef;

  constructor(private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private changeDetector: ChangeDetectorRef,
    private http: Http,
    private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.paramId = Number(params.get('id'));
      if (this.paramId == 0) {
        this.title = "Create Product";
      } else {
        this.title = "Edit Product";
        this.productService.getProductById(this.paramId).subscribe(data => {
          let res = JSON.parse(data['_body']);
          let product = res.data;

          this.category_id = product.category_id;
          this.product_name = product.name;
          this.product_description = product.description;
          this.product_price = product.price;
          this.product_portion_size = product.portion_size;
        });
      }
    });

    this.categoryService.getAllCategories().subscribe(data => {
      let res = JSON.parse(data['_body']);
      this.category_list = res.data;
    });
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  // save operation
  onSave() {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'));

    let product = {
      'name': this.product_name, 'description': this.product_description,
      'price': this.product_price, 'category_id': this.category_id, 'portion_size': this.product_portion_size
    };    

    if (this.paramId == 0) {  // create new product
      this.http.post(API_BASE_URL + '/products', product, { headers: headers }).subscribe(data => {
        let res = JSON.parse(data['_body']);
       
        if (res.success) {
          if (this.selectedFile) {  // file upload
            this.paramId = res.data.id;
            const fd = new FormData();
            fd.append('image', this.selectedFile, this.selectedFile.name);          

            this.http.post(API_BASE_URL + '/products/upload/' + this.paramId, fd, { headers: headers }).subscribe(data => {
              let res = JSON.parse(data['_body']);
              if (res.success) {
                this.toastrService.success('New Product is saved successfully');
                this.onInitInputElements();
              } else {
                this.toastrService.error('Image upload failed!');
               }
            });
          }else{
            this.toastrService.success('New Product is saved successfully');
            this.onInitInputElements();
          }

        } else {
           this.toastrService.error('Fill in empty inputs element');
        }
      });
    }
    else {        // update product
      this.http.put(API_BASE_URL + '/products/' + this.paramId, product, { headers: headers }).subscribe(data => {
        let res = JSON.parse(data['_body']);
        if (res.success) {

          if (this.selectedFile) {  // file upload
            const fd = new FormData();
            fd.append('image', this.selectedFile, this.selectedFile.name);

            this.http.post(API_BASE_URL + '/products/upload/' + this.paramId, fd, { headers: headers }).subscribe(data => {
              let res = JSON.parse(data['_body']);
              if (res.success) {
                this.toastrService.success('Product is updated successfully');
              } else {
                this.toastrService.error('Image upload failed');
               }
            });
          }else{
            this.toastrService.success('New Product is saved successfully');
          }

        } else {
          this.toastrService.error('Product update is  failed');
        }
      });
    }

  }


  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];   
  }

  onInitInputElements(){
    this.category_id = null;
    this.product_name = null;
    this.product_description =null;
    this.product_price =null;
    this.product_portion_size = null;
    this.ImageInput.nativeElement.value = '';
    this.selectedFile = null;
  }

}
