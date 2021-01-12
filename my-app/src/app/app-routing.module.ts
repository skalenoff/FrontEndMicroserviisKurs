import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


/**
 * Задаются пути до компонентов
 */
const routes: Routes = [
    {
      path: 'root',
      loadChildren: () => import('./pages/root/root.module').then((m => m.RootModule)),
    },
    {
      path: 'calc',
      loadChildren: () => import('./pages/calculation/calculation.module').then((m => m.CalculationModule)),
    }
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
