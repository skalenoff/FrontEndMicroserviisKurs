import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { EventsComponent } from './pages/events/events.component';
import { PricelistComponent } from './pages/pricelist/pricelist.component'
import { CatalogComponent } from './pages/catalog/catalog.component'
import { RequestsComponent } from './pages/requests/requests.component'

/**
 * Задаются пути до компонентов
 */
const routes: Routes = [
  { path: 'events', component: EventsComponent },
  { path: 'pricelist', component: PricelistComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'requests', component: RequestsComponent }
]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
