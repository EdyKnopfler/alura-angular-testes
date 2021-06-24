import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Photo } from "./photo";
//import { delay } from "rxjs/operators";

@Injectable()
export class PhotoBoardService {

  constructor(private http: HttpClient) {}

  // Permitindo undefined por causa do strict
  // Precisamos simular no teste a situação em que ainda não há fotos carregadas
  // (ver photo-list.component.spec.ts)
  getPhotos(): Observable<Photo[]> | undefined {
    return this.http.get<Photo[]>('http://localhost:3000/photos')

      // Demora proposital para ver o ícone de loading
      //.pipe(delay(2000));

      // Simulando alguma transformação no dado para teste do serviço
      .pipe(map((photos) => {
        return photos.map((f) => {
          return {...f, description: f.description.toUpperCase()};
        });
      }));
  }

}
