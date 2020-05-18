import { Component, OnInit } from '@angular/core';
import { Label } from 'ng2-charts';
import { Observable } from 'rxjs';
import { NorthwindService } from 'src/app/services/northwind.service';
import { ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-pagpie',
  templateUrl: './pagpie.component.html',
  styleUrls: ['./pagpie.component.css']
})
export class PagpieComponent implements OnInit {

  constructor(private north: NorthwindService) { }

  //Variables de datos
  dataDimension: Label[] = [];
  dataValues: ChartDataSets[] = [];
  // NG select
  defaultBindingsList = [
    { value: 1, label: 'Cliente', dimension: '[Dim Cliente].[Dim Cliente Nombre]' },
    { value: 2, label: 'Producto', dimension: '[Dim Producto].[Dim Producto Nombre]' },
    { value: 3, label: 'Empleado', dimension: '[Dim Empleado].[Dim Empleado Nombre]' }
  ];

  selectedDimension = null;

  // NG other select
  customer$: Observable<any>;
  selectedCustomer: any[] = [];
  year$: Observable<any>;
  selectedYear: any[] = [];
  month$: Observable<any>;
  selectedMonth: any[] = [];

  selectedParams: any = {
    dimension: '',
    clients: [],
    years: [],
    months: [],
  };

  ngOnInit(): void {
    this.selectedDimension = this.defaultBindingsList[0];

    this.customer$ = this.north.getItemsDimension(`${this.selectedDimension.dimension}`);
    this.year$ = this.north.getAnioDimension();
    this.month$ = this.north.getMesDimension();
    this.actualizarConsulta();
  }

  onChangeDimension($event) {
    this.selectedDimension = $event;
    this.customer$ = this.north.getItemsDimension(`${this.selectedDimension.dimension}`);
  }
  onChangeMonth($event) {
    this.selectedParams.months = $event;
    this.actualizarConsulta();
  }

  onChangeYear($event) {
    this.selectedParams.years = $event;
    this.actualizarConsulta();
  }

  onChangeCustomer($event) {
    this.selectedParams.clients = $event;
    this.actualizarConsulta();
  }


  clearModelCustomer() {
    this.selectedCustomer = [];
  }
  clearModelYear() {
    this.selectedYear = [];
  }
  clearModelMonth() {
    this.selectedMonth = [];
  }

  actualizarConsulta() {
    const dimension = this.selectedDimension.dimension;
    const { clients, months, years } = this.selectedParams;
    let body = { clients, months, years };
    for (const key in body) {
      if (body[key].length === 0) body[key] = [''];
    }

    this.north.getDataPieDimension(dimension ? dimension : '[Dim Cliente].[Dim Cliente Nombre]', body).subscribe((graphic: any) => {

        const labels = graphic.datosTabla.map(label => `${label.meses} ${label.años}`).filter((item, index, arr) => arr.indexOf(item) === index);

        let graphicValues: number[] = [];
        let values = graphic.datosTabla.map((value, index, arr) => {
          if (index === 0) {
            graphicValues.push(value.valor);
          } else if (value.descripcion === arr[index - 1].descripcion) {
            graphicValues.push(value.valor);
          }

          if (arr[index + 1] !== undefined && value.descripcion !== arr[index + 1].descripcion) {
            const vals = graphicValues;
            graphicValues = [];
            return { label: value.descripcion, data: vals }
          } else if (arr[index + 1] === undefined) {
            if (graphicValues.length === 0) graphicValues.push(value.valor);
            return { label: value.descripcion, data: graphicValues }
          }
          else return undefined;
        });

        values = values.filter(v => v !== undefined);

        const graphicData: ChartDataSets[] = values;
        const emptyData: ChartDataSets[] = [{ label: '', data: [0] }];


        this.dataDimension = labels ? labels : '';
        this.dataValues = graphicData.length !== 0 ? graphicData : emptyData;
    });
  }
}
