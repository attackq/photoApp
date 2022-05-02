import {Component, Input, OnInit} from '@angular/core';
import {iconsSrc} from "../../../icons-path";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormControls} from "../../../controls";
import {CrudService} from "../../../services/crud/crud.service";
import {EditDescription, EditUser, Post} from "../../../post";
import {Collections} from "../../../services/crud/collections";
import {combineLatest, takeWhile} from "rxjs";
import {UploadService} from "../../../services/crud/upload.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  @Input()
  public firestoreID: string = '';

  public icons = iconsSrc;

  public editUserForm: FormGroup = new FormGroup({});

  public formControls: typeof FormControls = FormControls;

  public imageLogoSrc: string | null = '';
  public imageBackSrc: string | null = '';
  public progressLogo: string | undefined = ''
  public progressBack: string | undefined = '';

  public isImage: boolean = false;

  constructor(private crudService: CrudService,
              private uploadService: UploadService) { }

  ngOnInit(): void {
    this.editUserForm.addControl(FormControls.logo, new FormControl('', Validators.required));
    this.editUserForm.addControl(FormControls.background, new FormControl('', Validators.required));
    this.editUserForm.addControl(FormControls.title, new FormControl('', Validators.required));
    this.editUserForm.addControl(FormControls.description, new FormControl('', Validators.required));
  }

  public onLogoSelected(event: Event): void {
    if (event) {
      const eventTarget = (<HTMLInputElement>event?.target);
      event.preventDefault();
      if (eventTarget && eventTarget.files) {
        const file: File = eventTarget.files[0];
        combineLatest(this.uploadService.uploadFileAndGetMetadata('userInfo', file))
          .pipe(
            takeWhile(([, link]) => {
              return !link;
            }, true),
          )
          .subscribe(([percent, link]) => {
            this.progressLogo = percent;
            this.imageLogoSrc = link;
          });
      }
      this.isImage = true;
    }
  }

  public onBackSelected(event: Event): void {
    if (event) {
      const eventTarget = (<HTMLInputElement>event?.target);
      event.preventDefault();
      if (eventTarget && eventTarget.files) {
        const file: File = eventTarget.files[0];
        combineLatest(this.uploadService.uploadFileAndGetMetadata('userInfo', file))
          .pipe(
            takeWhile(([, link]) => {
              return !link;
            }, true),
          )
          .subscribe(([percent, link]) => {
            this.progressBack = percent;
            this.imageBackSrc = link;
          });
      }
      this.isImage = true;
    }
  }

  public isControlValid(controlName: string): boolean {
    const control: AbstractControl | undefined = this.editUserForm?.controls[controlName];
    if (control) {
      return control.invalid && (control.dirty || control.touched);
    } else {
      return false;
    }
  }

  public updateDescription(id: string): void {
    const newUser: EditUser = {
      name: this.editUserForm.controls[FormControls.title].value,
      logo: this.imageLogoSrc,
      status: this.editUserForm.controls[FormControls.description].value,
      background: this.imageBackSrc
    }
    this.crudService.updateObject(Collections.USERS, id, newUser).subscribe();
  }

  public submitFrom(id: string): void {
    if (this.editUserForm.valid) {
      this.updateDescription(id);
      this.editUserForm?.reset();
    } else {
      alert('Error');
    }
  }

}
