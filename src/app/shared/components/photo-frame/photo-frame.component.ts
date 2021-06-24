import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-photo-frame',
  templateUrl: './photo-frame.component.html',
  styleUrls: ['./photo-frame.component.scss']
})
export class PhotoFrameComponent implements OnInit, OnDestroy {

  @Input() description: string = '';
  @Input() src: string = '';
  @Input() likes: number = 0;
  @Output() liked = new EventEmitter<void>();

  private debounceSubject: Subject<void> = new Subject();
  private unsubscribe: Subject<void> = new Subject();

  constructor() { }

  ngOnInit(): void {
    this.debounceSubject
      .asObservable()
      .pipe(
        debounceTime(500)  // Evitamos cliques frenéticos no botão Like
      )
      .pipe(
        takeUntil(this.unsubscribe)  // Finalização
      )
      .subscribe(() =>  {
        // Capturamos o evento do like e lançamos "para cima"
        this.liked.emit();
      });
  }

  like() {
    this.debounceSubject.next();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
