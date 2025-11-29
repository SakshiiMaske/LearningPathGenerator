import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LearningPathComponent } from './Components/learning-path/learning-path.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { SavedPathsComponent } from './Components/saved-paths/saved-paths.component';
import { ProgressComponent } from './Components/progress/progress.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: DashboardComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'learning-path', component: LearningPathComponent },
  { path: 'saved-paths', component: SavedPathsComponent },
  { path: 'progress/:pathId', component: ProgressComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
