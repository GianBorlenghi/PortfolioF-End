import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { EducationComponent } from './components/education/education.component';
import { ProjectComponent } from './components/project/project.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { TechnologiesComponent } from './components/technologies/technologies.component';
import { LoginComponent } from './components/header/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './components/logout/logout.component';
import { AddEducationComponent } from './components/education/add-education/add-education.component';
import { AddExperienceComponent } from './components/experience/add-experience/add-experience.component';
import { AddTechnologyComponent } from './components/technologies/add-technology/add-technology.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminRegisterComponent } from './components/register/admin-register/admin-register.component';
import { PersonComponent } from './components/person/person.component';
import { SelectPersonComponent } from './components/person/select-person/select-person.component';
import { EditComponent } from './components/person/edit/edit.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { EditExperienceComponent } from './components/experience/edit-experience/edit-experience.component';
import { EditEducationComponent } from './components/education/edit-education/edit-education.component';
import { NgChartsModule } from 'ng2-charts';
import { AddProjectComponent } from './components/project/add-project/add-project.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ExperienceComponent,
    EducationComponent,
    ProjectComponent,
    AboutMeComponent,
    TechnologiesComponent,
    LoginComponent,
    HomeComponent,
    LogoutComponent,
    AddEducationComponent,
    AddExperienceComponent,
    AddTechnologyComponent,
    RegisterComponent,
    AdminRegisterComponent,
    PersonComponent,
    SelectPersonComponent,
    EditComponent,
    EditExperienceComponent,
    EditEducationComponent,
    AddProjectComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
