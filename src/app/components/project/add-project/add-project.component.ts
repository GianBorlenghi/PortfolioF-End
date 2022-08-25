import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Person } from 'src/app/models/person';
import { Project } from 'src/app/models/project';
import { Technology } from 'src/app/models/technology';
import { AboutMeService } from 'src/app/service/about-me.service';
import { PersonServiceService } from 'src/app/service/person-service.service';
import { ProjectService } from 'src/app/service/project.service';
import { TechnologyService } from 'src/app/service/technology.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  croppedImage: any = '';
  imgChangeEvt: any = '';
  selectedFile: File;
  person: Person;
  tech: Technology[] = [];
  formAddProject: FormGroup;
  id: any;

  constructor(private router: Router, private aboutMe: AboutMeService, private personService: PersonServiceService, private techServ: TechnologyService, private formBuilder: FormBuilder, private projectServ: ProjectService) {

    this.formAddProject = this.formBuilder.group({
      name: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(30),Validators.pattern('^[a-zA-Z 0-9]*$')]],
      url:[''],
      gitUrl:[''],
      description:['',[Validators.required,Validators.minLength(20),Validators.maxLength(400),Validators.pattern('^[a-zA-Z 0-9,.]*$')]],
      listTechXProject:this.formBuilder.array([
        this.formBuilder.control('')
      ])
    })
  }
  ngOnInit(): void {
    this.aboutMe.id = localStorage.getItem('id');
    this.getPerson();
    this.getPerson();
    this.getTech();

  }
  get listTechXProject() {
    return this.formAddProject.get('listTechXProject') as FormArray;
  }

  addTech() {
    this.listTechXProject.push(this.formBuilder.control(''));
    const div = document.getElementById('techSelect');

  }
  public getPerson(): void {
    this.aboutMe.personInfo().subscribe(
      data => this.person = data
    )

  }

  public submit() {
    if (this.formAddProject.valid) {
      if (this.croppedImage !== '') {
        this.addProjectWithImage();
      } else {
        this.addProjectWithouthImage();
      }

    }
  }

  public getTech() {
    this.techServ.getTechnology().subscribe(
      data => {
        this.tech = data,
        console.log(data)
      }
    )
  }
  public fileEvent(event: any) {
    // this.selectedFile = event.target.files[0];
    const file = event.target.files[0];
    if (file.type === 'image/png' || file.type === 'image/jpeg') {
      this.selectedFile = file;
      this.imgChangeEvt = event;
    } else {
      alert('Incopatible extension');
      event.target.files[0] = null;
    }

  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
     }
  
  imageLoaded(event: any) {
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    alert('image failed');
  }
  /*
   clickButton(event:any){
    let p = document.getElementById("moreTech");
    p?.addEventListener('click',e=>{
      e.stopImmediatePropagation();
      this.addTechSelect();
    })
  }
  
  */


  deleteTechSelect(techIndex: number) {
    this.listTechXProject.removeAt(techIndex);
  }

  public addProjectWithouthImage() {

    const project: Project = {
      project_name: this.formAddProject.get('name')?.value,
      projectPerson: this.person,
      listTechXProject: this.deleteDuplicatedElements(),
      description : this.formAddProject.get('description')?.value,
      url : this.formAddProject.get('url')?.value,
      urlGit:this.formAddProject.get('gitUrl')?.value
    }

    this.projectServ.addProjectWithouthImage(project).subscribe(
      (data: any) => {
        console.log(data),
        this.router.navigate(['/home'])
      }
    )
  }

  public addProjectWithImage() {
    const project: Project = {
      project_name: this.formAddProject.get('name')?.value,
      projectPerson: this.person,
      description : this.formAddProject.get('description')?.value,
      url : this.formAddProject.get('url')?.value,
      urlGit:this.formAddProject.get('gitUrl')?.value,
      listTechXProject: this.deleteDuplicatedElements()
    }

    var byteString = atob(this.croppedImage.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const a = new Blob([ia]);
    const file = new File([a], this.selectedFile.name);

    this.projectServ.addProject(project, file).subscribe(
      (data: any) => {
        console.log(data),
        this.router.navigate(['/home'])
      }
    )
  }

  public deleteDuplicatedElements(): any {
    const p = this.formAddProject.get('listTechXProject')?.value
    let result = p.filter((item: any, index: any) => {
      return p.indexOf(item) === index;
    })
    return result;
  }

}
