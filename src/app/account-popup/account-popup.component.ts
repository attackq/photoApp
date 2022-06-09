import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {iconsSrc} from "../icons-path";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormControls} from "../controls";
import {Post} from "../post";
import {CrudService} from "../services/crud/crud.service";
import {Collections} from "../services/crud/collections";
import {UploadService} from "../services/crud/upload.service";
import {combineLatest, Subscription, takeWhile} from "rxjs";
import firebase from "firebase/compat/app";
import {AuthService} from "../services/auth/auth.service";
import {imgTypes} from "../file-types";

@Component({
  selector: 'app-account-popup',
  templateUrl: './account-popup.component.html',
  styleUrls: ['./account-popup.component.css'],
})
export class AccountPopupComponent implements OnInit, OnDestroy {

  private readonly MAX_LENGTH_TITLE_CONTROL: number = 25;
  private readonly MAX_LENGTH_DESC_CONTROL: number = 200;

  public imageSrc: string | null;
  public img: string | ArrayBuffer | null;
  public progress: string | undefined;
  public user: firebase.User | null;
  public icons = iconsSrc;
  public isImage: boolean = false;
  public addPostForm: FormGroup = new FormGroup({});
  public formControls: typeof FormControls = FormControls;
  public isTypeFile: boolean;
  public fileTypes = imgTypes;



  private subscriptions: Subscription[] = [];

  constructor(private crudService: CrudService,
              private uploadService: UploadService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.user$.subscribe((value: firebase.User | null) => this.user = value)
    );
    this.addPostForm.addControl(FormControls.img, new FormControl('', Validators.required));
    this.addPostForm.addControl(FormControls.title, new FormControl('', Validators.compose([Validators.required,
      Validators.maxLength(this.MAX_LENGTH_TITLE_CONTROL)])));
    this.addPostForm.addControl(FormControls.description, new FormControl('', Validators.compose([Validators.required,
      Validators.maxLength(this.MAX_LENGTH_DESC_CONTROL)])));
  }

  public addPost(post: Post): void {
    this.crudService.createObject(Collections.POSTS, post).subscribe();
  }

  public submitFrom(): void {
    if (this.addPostForm.valid) {
      const post: Post = {
        photo: this.imageSrc,
        title: this.addPostForm?.controls[FormControls.title].value,
        description: this.addPostForm?.controls[FormControls.description].value,
        likes: [],
        comments: [],
        sortID: new Date().getTime(),
        createdBy: this.user?.uid!,
        bookmarks: [],
        bookmarkDate: 0
      }
      this.addPost(post);
      this.addPostForm?.reset();
    } else {
      alert('Error');
    }
  }

  public isControlValid(controlName: string): boolean {
    const control: AbstractControl | undefined = this.addPostForm?.controls[controlName];
    if (control) {
      if (control.value && control.value.match(/^[ ]+$/)) {
        control.setValue(control.value.trim());
      }
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
        this.isTypeFile = false
        if (this.fileTypes.includes(file.type)) {
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
          this.isImage = true;
        } else {
          this.isTypeFile = true;
        }
      }
    }
  }

  public deleteUrl(): void {
    this.addPostForm.setErrors({'invalid': true});
    this.uploadService.deleteFile(this.imageSrc!);
    this.progress = '0';
    this.isImage = false;
    this.img = '';
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
