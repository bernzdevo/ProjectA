import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSample]'
})
export class SampleDirective {

  constructor(private element: ElementRef) {
    element.nativeElement.style.backgroundColor="red";
  }

}
