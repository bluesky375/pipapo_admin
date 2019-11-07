import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GalleryService } from '../services/gallery/gallery.service'
import { Router } from '@angular/router';
import { API_BASE_URL } from '../config/config';
import { ToastrService } from 'ngx-toastr';
import { Headers, Http } from '@angular/http';

import { MatDialog } from '@angular/material';
import { DeleteConfirmModalComponent } from '../delete-confirm-modal/delete-confirm-modal.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})

export class GalleryComponent implements OnInit {

  imageList: any[];
  fileToUpload: File = null;
  editImageModalTitle: string;
  selectedGalleryId: number;
  selectedGalleryImage: File = null;
  @ViewChild('ImageInput', { static: true }) ImageInput: ElementRef;
  base_url: string;


  constructor(private galleryService: GalleryService,
    private router: Router,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private http: Http) { }

  ngOnInit() {
    this.getAllGalleryList();
    this.base_url = API_BASE_URL;
  }


  setGalleryIdForEdit(id: number) {
    this.selectedGalleryId = id;
    if (id === 0) {
      this.editImageModalTitle = 'Create New Gallery Image';
    } else {
      this.editImageModalTitle = 'Edit Gallery Image';
    }
  }

  onImageFileSelected(event) {
    this.selectedGalleryImage = event.target.files[0];
  }

  onSave() {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'));
    if (this.selectedGalleryImage) {
      const fd = new FormData();
      fd.append('image', this.selectedGalleryImage, this.selectedGalleryImage.name);
      this.http.post(API_BASE_URL + '/gallery/upload/' + this.selectedGalleryId, fd, { headers: headers }).subscribe(data => {
        let res = JSON.parse(data['_body']);
        if (res.success) {
          if (this.selectedGalleryId === 0) {
            this.toastrService.success('New gallery Image has been uploaded successfully');
          } else {
            this.toastrService.success('Gallery Image has been updated successfully');
          }
          this.onInitInputElements();
          this.getAllGalleryList();
        } else {
          this.toastrService.error('Image upload failed!');
        }
      });
    }
  }

  onCancel() {
    this.onInitInputElements();
  }

  getAllGalleryList() {
    this.galleryService.getAllGallery().subscribe(res => {
      let response = JSON.parse(res['_body']);
      this.imageList = response.data;
    });
  }

  onInitInputElements() {
    this.selectedGalleryImage = null;
    this.ImageInput.nativeElement.value = '';
  }

  openModal(id, kind): void {
    const dialogRef = this.dialog.open(DeleteConfirmModalComponent, {
      width: '450px',
      data: { id: id, kind: kind }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.getAllGalleryList();
    });
  }

}
