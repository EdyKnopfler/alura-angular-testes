import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Photo } from './photo';

@Component({
  selector: 'app-photo-board',
  templateUrl: './photo-board.component.html',
  styleUrls: ['./photo-board.component.scss']
})
export class PhotoBoardComponent implements OnInit, OnChanges {

  @Input() photos: Photo[] = [];
  rows: any[][] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.photos) {
      this.rows = this.groupColumns(changes.photos.currentValue);
    }
  }

  private groupColumns(photos: Photo[]): any[][] {
    const newRows = [];
    const step = 4;

    for (let i = 0; i < photos.length; i += step) {
      newRows.push(photos.slice(i, i + step));
    }

    return newRows;
  }

}
