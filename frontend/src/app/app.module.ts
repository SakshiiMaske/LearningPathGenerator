import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { HeaderComponent } from './HeaderFooter/header/header.component';
import { FooterComponent } from './HeaderFooter/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { LearningPathComponent } from './Components/learning-path/learning-path.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { SavedPathsComponent } from './Components/saved-paths/saved-paths.component';
import { ProgressComponent } from './Components/progress/progress.component';
import { ToastComponent } from './Components/toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    LearningPathComponent,
    LoginComponent,
    RegisterComponent,
    SavedPathsComponent,
    ProgressComponent,
    ToastComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
