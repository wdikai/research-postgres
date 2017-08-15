import { Routes } from "@angular/router";
import { blankComponent } from "./components/common/layouts/blank.component";
import { basicComponent } from "./components/common/layouts/basic.component";

import { DashboardComponent } from "./views/dashboard/dashboard.component";


export const ROUTES: Routes = [
  // Main redirect
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // App views
  {
    path: '', component: basicComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
    ]
  },

  // Handle all other routes
  { path: '**', component: DashboardComponent }
];
