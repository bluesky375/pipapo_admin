import { Component, OnInit,ViewChild, ElementRef   } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ImprintService } from '../services/imprint/imprint.service';
import {ToastrService} from 'ngx-toastr';
 
@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.css']
})

export class ImprintComponent implements OnInit {

  title: string;
  selectedTabItem: string;
  htmlContent = '';
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultFontName: 'Arial',
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  @ViewChild('imprint',    { static: true }) imprint: ElementRef;
  @ViewChild('privacy',    { static: true }) privacy: ElementRef;
  @ViewChild('revocation', { static: true }) revocation: ElementRef;
  @ViewChild('info',       { static: true }) info: ElementRef;
  @ViewChild('help',       { static: true }) help: ElementRef;

  constructor(private imprintService: ImprintService,
              private toastrService: ToastrService) { }

  ngOnInit() {
    this.title = 'Edit Imprint';
    this.selectedTabItem = 'imprint';
    this.getContent();
  }

  onSelectedIndexChange(e) {
    switch (e) {
      case 0:
        this.title = 'Edit Imprint';
        this.selectedTabItem = 'imprint';
        break;
      case 1:
        this.title = 'Edit Privacy Policy';
        this.selectedTabItem = 'privacy policy';
        break;
      case 2:
        this.title = 'Edit Revocation Policy';
        this.selectedTabItem = 'revocation policy';
        break;
      case 3:
        this.title = 'Edit Info';
        this.selectedTabItem = 'info';
        break;
      case 4:
        this.title = 'Edit Help';
        this.selectedTabItem = 'help';
        break;
      default:
        this.selectedTabItem = 'imprint';
        this.title = 'Edit Imprint';
    }


  }

  getContent() {
    this.imprintService.getContent().subscribe(data => {
      let res = JSON.parse(data['_body']);
      if (res.success) {
        let len = res.data.length;
        console.log(res.data);
        if(len>0){
          for (let i = 0; i < len; i++) {
            let item_data = res.data[i];
            switch (item_data.item) {
              case 'imprint':              
                 this.imprint.nativeElement.innerHTML = item_data.content;
                break;
              case 'privacy policy':
                  this.privacy.nativeElement.innerHTML = item_data.content;                
                break;
              case 'revocation policy':
                  this.revocation.nativeElement.innerHTML = item_data.content;                 
                break;
              case 'info':
                  this.info.nativeElement.innerHTML = item_data.content;                 
                break;
              case 'help':
                  this.help.nativeElement.innerHTML = item_data.content;                  
                break;  
            }
          }
        }
        
      }
    })
  }

  onSave(){    
    let data = {item: this.selectedTabItem, content: this.htmlContent };
    this.imprintService.updateContent(this.selectedTabItem, data).subscribe(data=>{
      let res = JSON.parse(data['_body']);
      if(res.success){
        this.toastrService.success( this.selectedTabItem+' has been updated successfully!');
        this.getContent();
      }else{
        this.toastrService.success( this.selectedTabItem+' updating has been failed!');
      }
     
    })
  }

  onOpenEditModal(){
    this.htmlContent = '';
     this.imprintService.getContentByKey(this.selectedTabItem).subscribe(data=>{
       let res = JSON.parse(data['_body']);    
       if(res.success){
         if(res.data != null){
          this.htmlContent = res.data.content;          
         }      
       }
     })
  }

}
