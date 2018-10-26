import { SalaryIncreasePipe } from './salary-increase.pipe';

describe('SalaryIncreasePipe', () => {
  it('create an instance', () => {
    const pipe = new SalaryIncreasePipe();
    expect(pipe).toBeTruthy();
  });
});
