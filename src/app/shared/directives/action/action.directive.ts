import { Directive, EventEmitter, HostListener, Output } from "@angular/core";

@Directive({
  selector: '[appAction]'
})
export class ActionDirective {

  @Output() appAction = new  EventEmitter<Event>();

  @HostListener('click', ['$event'])
  hancleClick(event: Event) {
    this.appAction.emit(event);
  }

  @HostListener('keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    if (event.key == 'Enter' || event.key == ' ') {
      this.appAction.emit(event);
    }
  }

}
