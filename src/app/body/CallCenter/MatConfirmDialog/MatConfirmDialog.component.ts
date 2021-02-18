import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-matconfirmdialog',
  templateUrl: './MatConfirmDialog.component.html',
  styleUrls: ['./MatConfirmDialog.component.scss']
})
export class MatConfirmDialogComponent implements OnInit {
  // @Inject(MAT_DIALOG_DATA) public data: DialogData;
  constructor(public dialogRef: MatDialogRef<MatConfirmDialogComponent>
  ) { }


  ngOnInit(): any {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
