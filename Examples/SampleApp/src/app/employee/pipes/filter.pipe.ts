import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], searchText?: any, filterBy?: any): any {
    if (!searchText) { return value; }

    return value.filter(emp => {
      if (filterBy == "empId") {
        return emp.empId == searchText;
      } else if (filterBy == "firstname") {
        return emp.firstname.toLowerCase().includes(searchText);
      } else if (filterBy == "lastname") {
        return emp.lastname.toLowerCase().includes(searchText);
      } else {
        return emp.empId == searchText;
      }
    });



  }

}
