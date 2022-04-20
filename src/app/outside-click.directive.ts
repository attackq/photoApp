import {
  Directive,
  EventEmitter,
  HostListener,
  Output,
  ElementRef, ViewChild, AfterViewInit, ViewChildren
} from '@angular/core';

@Directive({
  selector: '[appOutsideClick]'
})
export class OutsideClickDirective {
  @Output()
  outsideClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  @HostListener('document:mousedown', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.outsideClick.emit(event);
    }
  }

  constructor(private elementRef: ElementRef) {
  }

}

