import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      /*
        - Inicio
        - Recetas
        - Categoria
        - Mi Perfil
        - Favoritos
        - Cerrar Sesión

        - Crear Receta //! Sera un FAB en la esquina inferior derecha
      */
      // { path: '', component: },
      // { path: 'register', component: },
      { path: '**', redirectTo: 'login' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
