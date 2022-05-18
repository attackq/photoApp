import {Component, Input, OnInit} from '@angular/core';
import {iconsSrc} from "../../../icons-path";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormControls} from "../../../controls";
import {CrudService} from "../../../services/crud/crud.service";
import {EditDescription, EditUser, Post, UserStore} from "../../../post";
import {Collections} from "../../../services/crud/collections";
import {combineLatest, filter, switchMap, takeWhile} from "rxjs";
import {UploadService} from "../../../services/crud/upload.service";
import {AuthService} from "../../../services/auth/auth.service";
import {map, tap} from "rxjs/operators";

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

  public imageLogoSrc: string | null;

  public imageBackSrc: string | null;

  public progressLogo: string | undefined;

  public progressBack: string | undefined;

  public isImageLogo: boolean;

  public isImageBack: boolean;

  public isLogoTypeFile: boolean;

  public isBackTypeFile: boolean;

  public fileTypes: string[] = [
    'image/jpeg',
    'image/pjpeg',
    'image/png',
  ]

  constructor(private crudService: CrudService,
              private uploadService: UploadService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.editUserForm.addControl(FormControls.logo, new FormControl(''));
    this.editUserForm.addControl(FormControls.background, new FormControl(''));
    this.editUserForm.addControl(FormControls.name, new FormControl('', Validators.maxLength(20)));
    this.editUserForm.addControl(FormControls.description, new FormControl('', Validators.maxLength(30)));
  }

  public onLogoSelected(event: Event): void {
    if (event) {
      const eventTarget = (<HTMLInputElement>event?.target);
      event.preventDefault();
      if (eventTarget && eventTarget.files) {
        const file: File = eventTarget.files[0];
        this.isLogoTypeFile = false
        if (this.fileTypes.includes(file.type)) {
          combineLatest(this.uploadService.uploadFileAndGetMetadata('posts', file))
            .pipe(
              takeWhile(([, link]) => {
                return !link;
              }, true),
            )
            .subscribe(([percent, link]) => {
              this.progressLogo = percent;
              this.imageLogoSrc = link;
            });
          this.isImageLogo = true;
        } else {
          this.isLogoTypeFile = true;
        }
      }
    }
  }

  public onBackSelected(event: Event): void {
    if (event) {
      const eventTarget = (<HTMLInputElement>event?.target);
      event.preventDefault();
      if (eventTarget && eventTarget.files) {
        const file: File = eventTarget.files[0];
        this.isBackTypeFile = false
        if (this.fileTypes.includes(file.type)) {
          combineLatest(this.uploadService.uploadFileAndGetMetadata('posts', file))
            .pipe(
              takeWhile(([, link]) => {
                return !link;
              }, true),
            )
            .subscribe(([percent, link]) => {
              this.progressBack = percent;
              this.imageBackSrc = link;
            });
          this.isImageBack = true;
        } else {
          this.isBackTypeFile = true;
        }
      }
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
    const name = this.editUserForm.controls[FormControls.name].value;
    const status = this.editUserForm.controls[FormControls.description].value;
    this.crudService.getUserDoc<UserStore>(Collections.USERS, id).pipe(
      map((user: UserStore | undefined) => {
          const newUser: EditUser = {
            name: name || user?.name,
            logo: this.imageLogoSrc || user?.logo!,
            status: status || user?.status,
            background: this.imageBackSrc || user?.background!
          }
          return this.crudService.updateObject(Collections.USERS, id, {...newUser});
      }),
    ).subscribe()
  }

  public deleteImg(): void {
    this.uploadService.deleteFile(this.imageBackSrc!);
    this.uploadService.deleteFile(this.imageLogoSrc!);
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
