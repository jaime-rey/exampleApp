import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './core/table.component';
import { FormComponent } from './core/form.component';
import { NotFoundComponent } from './core/notFound.component';
const routes: Routes = [
  {
    path: "ondemand",
    loadChildren: () => import("./ondemand/ondemand.module")
      .then(m => m.OndemandModule)
  },
  { path: "", redirectTo: "/ondemand", pathMatch: "full" },
  { path: 'form/:mode', component: FormComponent },
  { path: 'table', component: TableComponent },
  { path: 'table/:category', component: TableComponent },
  { path: '', redirectTo: '/table', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
export const routing = RouterModule.forRoot(routes);
