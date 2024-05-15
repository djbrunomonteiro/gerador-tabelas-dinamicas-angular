import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Observable } from 'rxjs';
import { ITabela } from '../itabela';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

import { trigger } from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatPaginatorModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.scss'
})
export class TabelaComponent implements OnInit, OnChanges {

@Input() columns!: string[];
@Input() data!: any[];
@ViewChild(MatPaginator) paginator!: MatPaginator;

@Output() clear = new EventEmitter<boolean>()

displayedColumns: string[] = [];
dataSource = new MatTableDataSource<any[]>([])

ngOnInit(): void {

}

ngOnChanges(changes: SimpleChanges): void {
  this.setMatTable();
}

setMatTable(){
  if(!this.columns || !this.data){return}
  this.displayedColumns = this.columns;
  this.dataSource.data = this.data;
  //necessario para dar tempo de renderizar data 
  setTimeout(() =>{
    this.dataSource.paginator = this.paginator;
  },100)
}

remove(){
  this.clear.emit(true)
}


}
