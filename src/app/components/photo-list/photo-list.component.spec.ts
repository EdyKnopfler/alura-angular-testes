import { PhotoBoardService } from 'src/app/shared/components/photo-board/photo-board.service';
import { PhotoBoardModule } from './../../shared/components/photo-board/photo-board.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoListComponent } from './photo-list.component';
import { HttpClientModule } from '@angular/common/http';
import { buildPhotoList } from 'src/app/test/build-photo-list';
import { Photo } from 'src/app/shared/components/photo-board/photo';
import { of } from 'rxjs';

// Componente de escopo de página

describe(PhotoListComponent.name, () => {
  let fixture: ComponentFixture<PhotoListComponent>;
  let component: PhotoListComponent;
  let service: PhotoBoardService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoListComponent ],

      // Resolvendo a injeção de dependências
      imports: [PhotoBoardModule, HttpClientModule],

    }).compileComponents();
    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;

    // Pedindo o cara sendo injetado
    service = TestBed.inject(PhotoBoardService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display board when data arrives', () => {
    // Mockando com o spy: defino na hora o valor de retorno
    const photos: Photo[] = buildPhotoList();
    spyOn(service, 'getPhotos').and.returnValue(of(photos));
    fixture.detectChanges();
    const board = fixture.nativeElement.querySelector('app-photo-board');
    const loader = fixture.nativeElement.querySelector('.loader')
    expect(board).withContext('board').not.toBeNull();
    expect(loader).withContext('loader').toBeNull();
  });

  it('should display loader while waiting for data', () => {
    const photos: Photo[] = buildPhotoList();
    spyOn(service, 'getPhotos').and.returnValue(undefined);
    fixture.detectChanges();
    const board = fixture.nativeElement.querySelector('app-photo-board');
    const loader = fixture.nativeElement.querySelector('.loader')
    expect(board).withContext('board').toBeNull();
    expect(loader).withContext('loader').not.toBeNull();
  });

});
