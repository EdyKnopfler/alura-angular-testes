import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { PhotoFrameComponent } from './photo-frame.component';
import { PhotoFrameModule } from './photo-frame.module';

describe(PhotoFrameComponent.name, () => {
  let fixture: ComponentFixture<PhotoFrameComponent>;
  let component: PhotoFrameComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PhotoFrameModule ]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoFrameComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // fakeAsync: agora eu sou o rei do tempo :)
  // tick: simula a passagem do tempo em uma área fakeAsync

  it(`#${PhotoFrameComponent.prototype.like.name}
      should trigger (@Output liked) only once when called multiple times within debounce time`, fakeAsync(() => {
    fixture.detectChanges();
    let times = 0;
    component.liked.subscribe(() => {
      times++;
    });
    component.like();
    component.like();
    tick(500);
    expect(times).toBe(1);
  }));

  it(`#${PhotoFrameComponent.prototype.like.name}
      should trigger (@Output liked) two times when called outside debounce time`, fakeAsync(() => {
    fixture.detectChanges();
    let times = 0
    component.liked.subscribe(() => {
      times++;
    });
    component.like();
    tick(500);
    component.like();
    tick(500);
    expect(times).toBe(2);
  }));

  // hora do DOM!
  // nativeElement

  it('should display number of likes when (@Input likes) is incremented', () => {
    fixture.detectChanges();
    component.likes++;
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement.querySelector('.like-counter');

    // Cuidado! Conforme a formatação do HTML, pode haver espaços na string do textContent:
    // Error: Expected ' 1 ' to be '1'.
    expect(element.textContent?.trim()).toBe('1');
  });

  it('should update aria-label when (@Input likes) is incremented', () => {
    fixture.detectChanges();
    component.likes++;
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(element.getAttribute('aria-label')).toBe('1 people liked');
  });

  it('should have aria-label with 0 (@Input likes)', () => {
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(element.getAttribute('aria-label')).toBe('0 people liked');
  });

  it('should display image with src and description when bound to properties', () => {
    const src = 'http://gato.com/foto.jpg';
    const description = 'pss, pss, pss';
    component.src = src;
    component.description = description;
    fixture.detectChanges();
    const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(img.getAttribute('src')).toBe(src);
    expect(img.getAttribute('alt')).toBe(description);
  });

  // Eventos de UI

  function updateLikesWhenLikedIsFired(callback: () => void) {
    component.liked.subscribe(() => {
      component.likes++;
      fixture.detectChanges();
      const counter: HTMLElement = fixture.nativeElement.querySelector('.like-counter');
      expect(counter.textContent?.trim()).toBe(component.likes.toString());
      callback();
    });
  }

  it('should display the number of likes when clicked', (done) => {
    fixture.detectChanges();

    updateLikesWhenLikedIsFired(done);

    const container: HTMLElement = fixture.nativeElement.querySelector('.like-widget-container');

    // click() é método
    container.click();
  });

  it('should display the number of likes when Enter key is pressed', (done) => {
    fixture.detectChanges();

    updateLikesWhenLikedIsFired(done);

    const container: HTMLElement = fixture.nativeElement.querySelector('.like-widget-container');

    // Criando um evento manualmente
    const event: KeyboardEvent = new KeyboardEvent('keyup', { key: 'Enter' });
    container.dispatchEvent(event);
  });

});
