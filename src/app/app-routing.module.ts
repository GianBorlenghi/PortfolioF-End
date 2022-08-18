import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { AddEducationComponent } from './components/education/add-education/add-education.component';
import { EditEducationComponent } from './components/education/edit-education/edit-education.component';
import { EducationComponent } from './components/education/education.component';
import { AddExperienceComponent } from './components/experience/add-experience/add-experience.component';
import { EditExperienceComponent } from './components/experience/edit-experience/edit-experience.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/header/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EditComponent } from './components/person/edit/edit.component';
import { PersonComponent } from './components/person/person.component';
import { SelectPersonComponent } from './components/person/select-person/select-person.component';
import { AddProjectComponent } from './components/project/add-project/add-project.component';
import { AdminRegisterComponent } from './components/register/admin-register/admin-register.component';
import { RegisterComponent } from './components/register/register.component';
import { AddTechnologyComponent } from './components/technologies/add-technology/add-technology.component';
import { Education } from './models/education';
import { LoginGuard } from './utils/login.guard';
import { UserGuard } from './utils/user.guard';

const routes: Routes = [
  
  { path: 'login', component: LoginComponent, canActivate : [LoginGuard], pathMatch: 'full'},
  { path: 'admin/addEducation', canActivate : [UserGuard], component: AddEducationComponent,  pathMatch: 'full'},
  {path: 'admin/addExperience' , canActivate : [UserGuard], component: AddExperienceComponent, pathMatch:'full'},
  {path: 'admin/addTechnology', canActivate : [UserGuard] , component : AddTechnologyComponent, pathMatch:'full'},
  {path:'register', canActivate: [LoginGuard], component : RegisterComponent,pathMatch :'full'},
  {path:'admin/register', canActivate: [UserGuard], component : AdminRegisterComponent,pathMatch :'full'},
  {path: 'admin/person/addPerson', canActivate:[UserGuard], component: PersonComponent, pathMatch:'full'},
  {path: 'person/selectPerson', component: SelectPersonComponent, pathMatch:'full'},
  {path: 'admin/person/editPerson', canActivate:[UserGuard], component: EditComponent, pathMatch:'full'},
  {path: 'admin/experience/editExperience/:idexp', canActivate:[UserGuard], component: EditExperienceComponent, pathMatch:'full'},
  {path: 'admin/education/editEducation/:id_education', canActivate:[UserGuard], component: EditEducationComponent, pathMatch:'full'},
  {path: 'admin/projects/addProject', canActivate:[UserGuard], component: AddProjectComponent, pathMatch:'full'},
  {path : '404' , component : NotFoundComponent,pathMatch:'full'},
  {path : '**' , component : HomeComponent,pathMatch:'full',redirectTo:''},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
