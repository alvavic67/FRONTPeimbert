import { Component, OnInit } from '@angular/core';
import { Label } from 'ng2-charts';
import { Observable } from 'rxjs';
import { NorthwindService } from 'src/app/services/northwind.service';

@Component({
  selector: 'app-pagpie',
  templateUrl: './pagpie.component.html',
  styleUrls: ['./pagpie.component.css']
})
export class PagpieComponent implements OnInit {

  constructor(private north: NorthwindService) { }

  //Variables de datos
  dataDimension: Label[] = [];
  dataValues: number[] = [];
  // NG select
  defaultBindingsList = [
    { value: 1, label: 'Cliente', dimension: '[Dim Cliente].[Dim Cliente Nombre]' },
    { value: 2, label: 'Producto', dimension: '[Dim Producto].[Dim Producto Nombre]' },
    { value: 3, label: 'Empleado', dimension: '[Dim Empleado].[Dim Empleado Nombre]' }
  ];
  selectedDimension = null;
  // NG other select
  customer$: Observable<any>;
  selectedCustomer: string[] = [];
  year$: Observable<any>;
  selectedYear: string[] = [];
  month$: Observable<any>;
  selectedMonth: string[] = [];

  ngOnInit(): void {
    this.selectedDimension = this.defaultBindingsList[0];

    this.customer$ = this.north.getItemsDimension(`${this.selectedDimension.dimension}`);
    this.year$ = this.north.getAnioDimension();
    this.month$ = this.north.getMesDimension();
  }

  onChangeDimension($event){
    this.selectedDimension = $event;
    this.customer$ = this.north.getItemsDimension(`${this.selectedDimension.dimension}`);
  }

  onChangeValues(){
    /*this.north.getDataGeneric(this.selectedDimension.label, this.selectedCustomer, this.selectedMonth, this.selectedYear).subscribe((result:any)=>{
      this.dataDimension = result.datosDimension;
      this.dataValues = result.datosVenta
    });*/
  }

  clearModel() {
    this.selectedCustomer = [];
  }
  clearModelY() {
    this.selectedYear = [];
  }
  clearModelM() {
    this.selectedMonth = [];
  }
}
