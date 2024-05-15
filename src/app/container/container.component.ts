import { Component, OnInit, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { TabelaComponent } from '../tabela/tabela.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { catchError, of } from 'rxjs';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatDividerModule,
    TabelaComponent,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
  ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent implements OnInit {


  http = inject(HttpClient);
  fb = inject(FormBuilder);

  form = this.fb.group({
    tabelas: this.fb.array([])
  });

  ctrlTabelas = this.form.get('tabelas') as FormArray;

  ngOnInit(): void {
    this.createGroupTabela();
  }

  createGroupTabela() {
    const group = this.fb.group({
      url: ['https://jsonplaceholder.typicode.com/todos'],
      columns: [[]],
      data: [[]]
    })
    this.ctrlTabelas.push(group)
  }

  getApi(group: any, index: number) {
    const { url, columns, data } = group.value;
    if (!url) { return };
    this.http.get(url)
      .pipe(
        catchError(err => of({error: true, message: err.message}))
      )
      .subscribe((results: any) => {
        const { error, message } = results
        if (error) {
          window.alert(message)
          return
        }
        const columns = this.extractColumns(results[0]);
        const data = results;
        const ctrlReferencia = this.ctrlTabelas.controls[index] as FormGroup;
        ctrlReferencia.patchValue({ columns, data })

      })
  }

  extractColumns(item: any) {
    return item ? Object.keys(item) : [];
  }

  remove(index: number){
    console.log(index);
    
    this.ctrlTabelas.removeAt(index)
  }

}
