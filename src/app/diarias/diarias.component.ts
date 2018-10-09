import { Component, OnInit } from '@angular/core';
import { EmentasService } from '../ementas.service';

import { Diaria } from '../models';

@Component({
  selector: 'app-diarias',
  templateUrl: './diarias.component.html',
  styleUrls: ['./diarias.component.css']
})
export class DiariasComponent implements OnInit {
  diarias: Diaria[];

  constructor(private ementasService: EmentasService) {}

  ngOnInit(): void {
    console.log('oninit diarias.componnet');
    this.ementasService.getEmentas().subscribe((diarias: Diaria[]) => {
      this.diarias = diarias;
    });
  }
}
