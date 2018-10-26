import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'salaryIncrease'
})
export class SalaryIncreasePipe implements PipeTransform {

  transform(value: any, args?: any,amount?:any): any {
    if(args!=undefined && amount!=undefined){
        if(args=="+"){
          return value+amount;
        }else{
          return value-amount;
        }
    }

    return value;
  
  }

}
