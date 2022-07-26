import { NgModule } from '@angular/core'
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'

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
