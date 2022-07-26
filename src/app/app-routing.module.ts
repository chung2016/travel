import { NgModule } from '@angular/core'
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'
import { NotFoundComponent } from './not-found/not-found.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'v1',
    pathMatch: 'full',
  },
  {
    path: 'v1',
    loadChildren: () => import('./v1/v1.module').then((m) => m.V1Module),
  },
  {
    path: 'v2',
    loadChildren: () => import('./v2/v2.module').then((m) => m.V2Module),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
