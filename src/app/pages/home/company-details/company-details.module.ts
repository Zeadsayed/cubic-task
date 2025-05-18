import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CompanyDetailsComponent } from './company-details.component';

export const routes: Routes = [
  { path: '', component: CompanyDetailsComponent },
];

@NgModule({
  declarations: [CompanyDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
  ],
})
export class CompanyDetailsModule {}
