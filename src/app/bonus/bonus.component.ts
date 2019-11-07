import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BonusService } from '../services/bonus/bonus.service';
import { Bonus } from '../interfaces/model';
import { ToastrService } from 'ngx-toastr';

import { MatDialog} from '@angular/material';
import { DeleteConfirmModalComponent } from '../delete-confirm-modal/delete-confirm-modal.component';


@Component({
    selector: 'app-bonus',
    templateUrl: './bonus.component.html',
    styleUrls: ['./bonus.component.css']
})

export class BonusComponent implements OnInit {
    dataSource: any;
    bonus_all_list: any[];
    displayedColumns: string[] = ["title", "description", "points", "plates", "enabled", "actions"];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    // input controls
    bonus_title: string = null;
    bonus_description: string = null;
    bonus_points: number = null;
    bonus_plates: number = null;
    bonus_enabled: boolean = null;

    editBonusModalTitle: string;
    selectedBonusId: number = 0;

    constructor(private router: Router,
        private bonusService: BonusService,
        private dialog: MatDialog,
        private toastrService: ToastrService) { }

    ngOnInit() {
        this.getAllBonusList();
    }

    getAllBonusList() {
        this.bonusService.getAllBonuses().subscribe(data => {        
            let res = JSON.parse(data['_body']);
            this.bonus_all_list = res.data;
            this.dataSource = new MatTableDataSource<Bonus>(this.bonus_all_list);
            this.dataSource.paginator = this.paginator;
        });
    }

    onSetBonusId(id: number) {
        this.selectedBonusId = id;
        this.onInitInputControls();
        if (id == 0) {
            this.editBonusModalTitle = "New Bonus";
        } else {
            this.editBonusModalTitle = "Edit Bonus";
            this.bonusService.getBonusById(id).subscribe(data => {
                let res = JSON.parse(data['_body']);
                if (res.success) {
                  this.bonus_title = res.data.title;
                  this.bonus_description = res.data.description;
                  this.bonus_points = res.data.points;
                  this.bonus_plates = res.data.plates;
                  this.bonus_enabled = (res.data.enabled==1? true : false);
                }else{
                    console.log(res);
                }
            });
        }
    }

    onInitInputControls() {
        this.bonus_title = null;
        this.bonus_description = null;
        this.bonus_plates = null;
        this.bonus_points = null;
        this.bonus_enabled = false;
    }

    onCancel() {
        this.onInitInputControls();
    }

    onSave() {
        
        if (this.selectedBonusId == 0) {  //create
            let bonus = {               
                title: this.bonus_title,
                description: this.bonus_description,
                points: this.bonus_points,
                plates: this.bonus_plates,
                enabled: this.bonus_enabled ? 1: 0
            };
            this.bonusService.insertNewBouns(bonus).subscribe(data => {
                let res = JSON.parse(data['_body']);
                if (res.success) {
                   this.toastrService.success('New bonus has been created successfully!');
                   this.onInitInputControls();
                   this.getAllBonusList();
                }else{
                    this.toastrService.success('Please fill in empty input element!');
                    this.onInitInputControls();
                }
            });
        } else {  //update
            let bonus = {
                title: this.bonus_title,
                description: this.bonus_description,
                points: this.bonus_points,
                plates: this.bonus_plates,
                enabled: this.bonus_enabled ? 1: 0
            };           
            this.bonusService.updateBouns(this.selectedBonusId, bonus).subscribe(data => {
                let res = JSON.parse(data['_body']);
                if (res.success) {
                    this.toastrService.success('Bonus has been updated successfully!');
                    this.onInitInputControls();
                    this.getAllBonusList();
                }else{
                    this.toastrService.success('Please fill in empty input element!');
                    this.onInitInputControls();
                }
            });
        }
    }

    openModal(id, kind): void {
        const dialogRef = this.dialog.open(DeleteConfirmModalComponent, {
          width: '450px',
          data: { id: id, kind: kind }
        });
        dialogRef.afterClosed().subscribe(res => {
         this.getAllBonusList();     
        });
      }
    
}

