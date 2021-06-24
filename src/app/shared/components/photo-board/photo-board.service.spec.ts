import { TestBed } from '@angular/core/testing';
import { PhotoBoardService } from 'src/app/shared/components/photo-board/photo-board.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { buildPhotoList } from 'src/app/test/build-photo-list';

// Teste de serviços que usam HttpClient

const mockData = {
   api: 'http://localhost:3000/photos',  // obrigatório bater
   data: buildPhotoList()
};

describe(PhotoBoardService.name, () => {

  let service: PhotoBoardService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // provider alternativo para HttpClient
      providers: [PhotoBoardService]
    });
    service = TestBed.inject(PhotoBoardService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it(`#${PhotoBoardService.prototype.getPhotos.name}
      should return photos with description in uppercase`, (done) => {

    service.getPhotos()?.subscribe((photos) => {
      for (let i = 0; i < photos.length; i++) {
        expect(photos[i].description).withContext(i.toString()).toBe(`PHOTO ${i}`);
      }
      done();
    });

    // Mockando dados da API
    // DEPOIS que a requisição é feita (o cliente de teste fica esperando)
    httpController.expectOne(mockData.api).flush(mockData.data);


  });

  afterEach(() => {
    // Verifica se há requisições feitas esperando
    httpController.verify();
  })

});
