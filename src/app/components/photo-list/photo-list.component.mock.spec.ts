import { PhotoBoardService } from 'src/app/shared/components/photo-board/photo-board.service';
import { PhotoBoardModule } from './../../shared/components/photo-board/photo-board.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoListComponent } from './photo-list.component';
import { HttpClientModule } from '@angular/common/http';
import { buildPhotoList } from 'src/app/test/build-photo-list';
import { of } from 'rxjs';

// Componente de escopo de página

describe(PhotoListComponent.name + ' mockando com useValue', () => {
  let fixture: ComponentFixture<PhotoListComponent>;
  let component: PhotoListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoListComponent ],

      // Resolvendo a injeção de dependências
      imports: [PhotoBoardModule, HttpClientModule],

      // Mocks
      // O PhotoBoardModule já tem um provider para o PhotoBoardService, aqui sobrescrevemos
      // Útil quando todos os testes usam o mesmo mock
      // DICA: se queremos preservar algum comportamento, podemos criar uma classe mock que estenda
      // o service, aí substituímos useValue por useClass.
      providers: [
        {
          provide: PhotoBoardService,
          useValue: {
            getPhotos() {
              return of(buildPhotoList());
            }
          }
        }
      ]

    }).compileComponents();
    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display board when data arrives', () => {
    fixture.detectChanges();
    const board = fixture.nativeElement.querySelector('app-photo-board');
    const loader = fixture.nativeElement.querySelector('.loader')
    expect(board).withContext('board').not.toBeNull();
    expect(loader).withContext('loader').toBeNull();
  });

});
