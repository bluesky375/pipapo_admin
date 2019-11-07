import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalData } from '../interfaces/model';

import {ProductService} from '../services/product/product.service';
import { CategoryService } from '../services/category/category.service';
import {GalleryService} from '../services/gallery/gallery.service';
import {ToastrService} from 'ngx-toastr';
import { BonusService } from 'app/services/bonus/bonus.service';

@Component({
  selector: 'app-delete-confirm-modal',
  templateUrl: './delete-confirm-modal.component.html',
  styleUrls: ['./delete-confirm-modal.component.scss']
})
export class DeleteConfirmModalComponent implements OnInit {  

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private toastrService:ToastrService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private galleryService: GalleryService,
    private bonusService: BonusService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  onDeleteClick(){
    if(this.data.kind == 'product'){
       this.productService.deleteProductById(this.data.id).subscribe(data=>{
        let res = JSON.parse(data['_body']);      
        if (res.success) {
          this.toastrService.success('Product has been deleted successfully!');
        }else{
          this.toastrService.error('Product deleting  has been failed!');
        }
        this.dialogRef.close();
       })
     
    }else if(this.data.kind == 'category'){
      this.categoryService.deleteCategoryById(this.data.id).subscribe(data=>{
        let res = JSON.parse(data['_body']);      
        if (res.success) {
          this.toastrService.success('Category has been deleted successfully!');
        }else{
          this.toastrService.error('Category deleting  has been failed!');
        }
        this.dialogRef.close();
       })
    }else if(this.data.kind == 'gallery'){
      this.galleryService.deleteGalleryById(this.data.id).subscribe(data=>{
        let res = JSON.parse(data['_body']);      
        if (res.success) {
          this.toastrService.success('Gallery image has been deleted successfully!');
        }else{
          this.toastrService.error('Gallery image deleting has been failed!');
        }
        this.dialogRef.close();
       })
    }else if(this.data.kind == 'bonus'){
      this.bonusService.deleteBonusById(this.data.id).subscribe(data=>{
        let res = JSON.parse(data['_body']);      
        if (res.success) {
          this.toastrService.success('Bonus has been deleted successfully!');
        }else{
          this.toastrService.error('Bonus deleting has been failed!');
        }
        this.dialogRef.close();
       })
    }
  }

}
