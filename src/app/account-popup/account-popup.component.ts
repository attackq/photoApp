import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {iconsSrc} from "../icons-path";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormControls} from "../controls";
import {Post} from "../post";
import {CrudService} from "../services/crud/crud.service";
import {Collections} from "../services/crud/collections";
import {UploadService} from "../services/crud/upload.service";
import {combineLatest, takeWhile} from "rxjs";
import firebase from "firebase/compat/app";
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-account-popup',
  templateUrl: './account-popup.component.html',
  styleUrls: ['./account-popup.component.css'],
})
export class AccountPopupComponent implements OnInit {

  public imageSrc: string | null = '';

  public img: string | ArrayBuffer | null = '';

  public progress: string | undefined = '';

  public user: firebase.User | null = null;

  public icons = iconsSrc;

  public isImage: boolean = false;

  public myForm: FormGroup = new FormGroup({});

  public formControls: typeof FormControls = FormControls;

  constructor(private crudService: CrudService,
              private uploadService: UploadService,
              private authService: AuthService) {
    this.authService.user$.subscribe((value: firebase.User | null) => this.user = value);
  }

  ngOnInit(): void {
    this.myForm.addControl(FormControls.img, new FormControl('', Validators.required));
    this.myForm.addControl(FormControls.title, new FormControl('', Validators.required));
    this.myForm.addControl(FormControls.description, new FormControl('', Validators.required));
  }

  public addPost(post: Post): void {
    this.crudService.createObject(Collections.POSTS, post).subscribe();
  }

  public submitFrom(): void {
    if (this.myForm.valid) {
      const post: Post = {
        photo: this.imageSrc,
        title: this.myForm?.controls[FormControls.title].value,
        description: this.myForm?.controls[FormControls.description].value,
        likes: [],
        comments: [],
        sortID: new Date().getTime(),
        createdBy: this.user?.uid!
      }
      this.addPost(post);
      this.myForm?.reset();
    } else {
      alert('Error');
    }
  }

  public isControlValid(controlName: string): boolean {
    const control: AbstractControl | undefined = this.myForm?.controls[controlName];
    if (control) {
      return control.invalid && (control.dirty || control.touched);
    } else {
      return false;
    }
  }

  public onFileSelected(event: Event): void {
    if (event) {
      const eventTarget = (<HTMLInputElement>event?.target);
      event.preventDefault();
      if (eventTarget && eventTarget.files) {
        const file: File = eventTarget.files[0];
        const reader = new FileReader();
        reader.onload = e => this.img = reader.result;
        reader.readAsDataURL(file);
        combineLatest(this.uploadService.uploadFileAndGetMetadata('posts', file))
          .pipe(
            takeWhile(([, link]) => {
              return !link;
            }, true),
          )
          .subscribe(([percent, link]) => {
            this.progress = percent;
            this.imageSrc = link;
          });
      }
      this.isImage = true;
    }
  }

  public deleteUrl(): void {
    this.uploadService.deleteFile(this.imageSrc!);
    this.progress = '0';
    this.isImage = false;
    this.img = '';
  }
}
