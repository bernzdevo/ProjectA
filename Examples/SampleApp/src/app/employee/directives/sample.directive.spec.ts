import { SampleDirective } from './sample.directive';

describe('SampleDirective', () => {
  it('should create an instance', () => {
    let elMock={
      nativeElement:document.createElement('div')
    };

    const directive = new SampleDirective(elMock);
    expect(directive).toBeTruthy();
  });
});
