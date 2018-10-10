import { Component, OnInit } from '@angular/core';
import { EmentasService } from '../ementas.service';

import { Diaria } from '../models';

@Component({
  selector: 'app-diarias',
  templateUrl: './diarias.component.html',
  styleUrls: ['./diarias.component.css']
})
export class DiariasComponent implements OnInit {
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  diarias: Diaria[];
  loading: boolean;
  currentId: number;
  atual: Diaria;

  constructor(private ementasService: EmentasService) {}

  ngOnInit(): void {
    this.loading = true;
    this.ementasService.getEmentas().subscribe((diarias: Diaria[]) => {
      this.diarias = diarias;
      for (let i in this.diarias) {
        if (this.diarias[i].isToday()) {
          this.currentId = this.diarias[i].id;
          this.atual = this.diarias[i];
        }
      }
      this.loading = false;
    });
  }

  swipeRight() {
    // previous

    const isLast = this.currentId === this.diarias.length - 1;
    this.currentId = isLast ? 0 : this.currentId + 1;

    this.atual = this.diarias[this.currentId];
  }

  swipeLeft() {
    // next
    const isFirst = this.currentId === 0;
    this.currentId = isFirst ? this.diarias.length - 1 : this.currentId - 1;

    this.atual = this.diarias[this.currentId];
  }

  swipe(currentIndex: number, action: string = this.SWIPE_ACTION.RIGHT) {
    if (currentIndex > this.diarias.length || currentIndex < 0) return;

    // next
    if (action === this.SWIPE_ACTION.LEFT) {
      const isLast = currentIndex === this.diarias.length - 1;
      this.currentId = isLast ? 0 : currentIndex + 1;
    }

    // previous
    if (action === this.SWIPE_ACTION.RIGHT) {
      const isFirst = currentIndex === 0;
      this.currentId = isFirst ? this.diarias.length - 1 : currentIndex - 1;
    }
    this.atual = this.diarias[this.currentId];
  }
}
