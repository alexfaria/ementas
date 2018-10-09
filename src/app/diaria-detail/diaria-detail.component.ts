import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Diaria } from '../models';

import { EmentasService } from '../ementas.service';

@Component({
  selector: 'diaria-detail',
  templateUrl: './diaria-detail.component.html',
  styleUrls: ['./diaria-detail.component.css']
})
export class DiariaDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private ementasService: EmentasService,
    private location: Location
  ) {}

  diaria: Diaria;

  ngOnInit(): void {
    console.log('ngoninit diaria-detail');
    this.getDiaria();
  }

  getDiaria(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.diaria = this.ementasService.getDiaria(id);
  }
}
