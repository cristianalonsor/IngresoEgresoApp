import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'ordenAlfabetico'
})
export class OrdenAlfabeticoPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    return items.slice().sort( (a, b) => {
      if(a.description > b.description) {
        return 1;
      } else {
        return -1;
      }
    });
  }

}
