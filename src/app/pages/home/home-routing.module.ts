import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./companies-list/companies-list.module').then(
        (m) => m.CompaniesListModule
      ),
  },

  {
    path: 'details/:id',
    loadChildren: () =>
      import('./company-details/company-details.module').then(
        (m) => m.CompanyDetailsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
