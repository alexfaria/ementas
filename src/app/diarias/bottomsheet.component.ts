import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'bottom-sheet',
  template:
  `
    <ng-container *ngFor="let a of data">
    <p>{{a}}</p>
    </ng-container>
  `
})
export class BottomSheetComponent {
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}
}
