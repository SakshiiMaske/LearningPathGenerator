import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LearningPathComponent } from './Components/learning-path/learning-path.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'learning-path', component: LearningPathComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
