import { PhotoBoardModule } from './photo-board.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoBoardComponent } from './photo-board.component';
import { Photo } from './photo';
import { Component, Input, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { buildPhotoList } from 'src/app/test/build-photo-list';

@Component({
  template: '<app-photo-board [photos]="photos"></app-photo-board>'
})
class PhotoBoardTestComponent {
  @ViewChild(PhotoBoardComponent) board!: PhotoBoardComponent;
  photos: Photo[] = [];
}

describe(PhotoBoardComponent.name, () => {

  let fixture: ComponentFixture<PhotoBoardComponent>;
  let component: PhotoBoardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotoBoardTestComponent],
      imports: [PhotoBoardModule]
    }).compileComponents();
    fixture = TestBed.createComponent(PhotoBoardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display rows and columns when (@Input photos) has value #1', () => {
    component.photos = buildPhotoList();

    // ngOnChanges só seria chamado se (@Input photos) fosse atribuído pelo template de outro componente!
    const changes: SimpleChanges = { photos: new SimpleChange([], component.photos, true) };
    component.ngOnChanges(changes);

    expect(component.rows.length).withContext('number of rows').toBe(2);
    expect(component.rows[0].length).withContext('number of columns from first row').toBe(4);
    expect(component.rows[1].length).withContext('number of columns from second row').toBe(4);
  });

  it('should display rows and columns when (@Input photos) has value #2', () => {
    // Aqui usamos um "container dummy" que contém o componente sob teste
    let fixtureDummy = TestBed.createComponent(PhotoBoardTestComponent);
    let componentDummy = fixtureDummy.componentInstance;

    componentDummy.photos = buildPhotoList();

    fixtureDummy.detectChanges();  // Como temos um template, o ngOnChanges é disparado :)

    const board: PhotoBoardComponent = componentDummy.board;

    expect(board.rows.length).withContext('number of rows').toBe(2);
    expect(board.rows[0].length).withContext('number of columns from first row').toBe(4);
    expect(board.rows[1].length).withContext('number of columns from second row').toBe(4);
  });


});
