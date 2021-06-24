import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UniqueIdService } from '../../services/unique-id/unique-id.service';

import { LikeWidgetComponent } from './like-widget.component';

// Ver karma.conf.js

describe(LikeWidgetComponent.name, () => {
  let fixture: ComponentFixture<LikeWidgetComponent>;
  let component: LikeWidgetComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Declarações idênticas às de um módulo.
      // Ao invés de redeclarar tudo que há em um módulo, podemos
      // importar o módulo "sob teste" no módulo "de teste" :)
      //
      // imports: [LikeWidgetModule],
      //
      // Abordagem test-first: vai construindo os elementos, definindo dependências...
      // Quando o componente está pronto, cria-se um módulo e faz o import.
      // (Já poderia ir definindo direto no módulo)
      imports: [FontAwesomeModule],
      declarations: [ LikeWidgetComponent ],
      providers: [UniqueIdService]
    })
    .compileComponents();  // este método é assíncrono

    fixture = TestBed.createComponent(LikeWidgetComponent);
    component = fixture.componentInstance;
    // Evite fazer o fixture.detectChanges() aqui
  });

  it('should create component', () => {
    expect(component).toBeTruthy();

    // São o mesmo objeto
    // debugElement fornece alguns métodos de procura atrelados ao Angular (ver action.directive.spec.ts)
    expect(fixture.nativeElement).toBe(fixture.debugElement.nativeElement);
  });

  it('should auto generate an ID during ngOnInit when (@Input id) is not assigned', () => {
    // Por padrão, a change detection não é chamada automaticamente nos testes.
    // No primeiro detectChanges() o ngOnInit é executado.
    // É possível fazer automaticamente mas não é recomendado,
    // pois não será possível atribuir valor às input properties antes do ngOnInit.
    fixture.detectChanges();
    expect(component.id).toBeTruthy();
  });

  it('should NOT generate an ID during ngOnInit when (@Input id) is assigned', () => {
    const someId = 'algum id';
    component.id = someId;
    fixture.detectChanges();
    expect(component.id).toBe(someId);
  });

  it(`#${LikeWidgetComponent.prototype.like.name} should trigger (@Output liked) when called #1`, (done) => {
    fixture.detectChanges();

    // O EventEmitter é um Observable :)
    component.liked.subscribe(() => {
      // Evita o warning
      expect(true).toBeTrue();

      // Há um timeout para chamar o done
      done();
    });

    component.like();
  });

  // O mesmo que o anterior, de forma menos burocrática
  it(`#${LikeWidgetComponent.prototype.like.name} should trigger (@Ouput liked) when called #2`, () => {
    spyOn(component.liked, 'emit');  // Espião: intercepta o método https://www.javatpoint.com/mock-vs-stub-vs-spy
    fixture.detectChanges();
    component.like();
    expect(component.liked.emit).toHaveBeenCalled();
  });

});
