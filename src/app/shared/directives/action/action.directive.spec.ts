import { ActionDirectiveModule } from './action.module';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActionDirective } from './action.directive';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

// Teste de diretiva: criamos um componente "dummy" ou fantoche

@Component({
  template: '<div (appAction)="actionHandler($event)"></div>'
})
class ActionDirectiveTestComponent {
  event!: Event;
  actionHandler(event: Event) {
    this.event = event;
  }
}

describe(ActionDirective.name, () => {

  let fixture: ComponentFixture<ActionDirectiveTestComponent>;
  let component: ActionDirectiveTestComponent;

  // Mantendo uma maneira padronizada de criar o módulo de teste.
  // Como não há templates, não precisamos chamar compileComponents() e por isso podemos tirar o async e o await.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionDirectiveTestComponent],
      imports: [ActionDirectiveModule]
    }).compileComponents();
    fixture = TestBed.createComponent(ActionDirectiveTestComponent);
    component = fixture.componentInstance;
  });

  it('should emit event with payload when Enter is pressed', () => {

    // Usando debugElement: posso fazer queries tipadas
    //const div: HTMLElement = fixture.nativeElement.querySelector('div');
    const div: DebugElement = fixture.debugElement.query(By.directive(ActionDirective));

    div.nativeElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    expect((component.event as KeyboardEvent).key).toBe('Enter');
  });

  it('should emit event with payload when Space is pressed', () => {
    const div: HTMLElement = fixture.nativeElement.querySelector('div');
    div.dispatchEvent(new KeyboardEvent('keyup', { key: ' ' }));
    expect((component.event as KeyboardEvent).key).toBe(' ');
  });

  it('should emit event when clicked', () => {
    const div: HTMLElement = fixture.nativeElement.querySelector('div');
    div.dispatchEvent(new MouseEvent('click'));
    expect(component.event).toBeTruthy();
  });

});
