import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'bottom-sheet',
  templateUrl: 'bottomsheet.component.html'
})
export class BottomSheetComponent {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>
  ) {}

  dismissSheet(): void {
    this.bottomSheetRef.dismiss();
    console.log('dismissed.');
  }
}
