import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CompaniesListComponent } from './companies-list.component';

export const routes: Routes = [{ path: '', component: CompaniesListComponent }];

@NgModule({
  declarations: [CompaniesListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
  ],
})
export class CompaniesListModule {}
