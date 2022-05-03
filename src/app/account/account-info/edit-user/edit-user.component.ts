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

  public imageLogoSrc: string | null = '';
  public imageBackSrc: string | null = '';
  public progressLogo: string | undefined = ''
  public progressBack: string | undefined = '';

  public isImageLogo: boolean = false;
  public isImageBack: boolean = false;


  constructor(private crudService: CrudService,
              private uploadService: UploadService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.editUserForm.addControl(FormControls.logo, new FormControl(''));
    this.editUserForm.addControl(FormControls.background, new FormControl(''));
    this.editUserForm.addControl(FormControls.title, new FormControl(''));
    this.editUserForm.addControl(FormControls.description, new FormControl(''));
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
      this.isImageLogo = true;
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
      this.isImageBack = true;
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
    const name = this.editUserForm.controls[FormControls.title].value;
    // console.log(this.editUserForm.controls[FormControls.title]);
    const status = this.editUserForm.controls[FormControls.description].value;
    this.crudService.getUserDoc<UserStore>(Collections.USERS, id).pipe(
      map((user: UserStore | undefined) => {
          // console.log(this.editUserForm.controls[FormControls.title]);
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


  public submitFrom(id: string): void {
    if (this.editUserForm.valid) {
      this.updateDescription(id);
      this.editUserForm?.reset();
    } else {
      alert('Error');
    }
  }

}
