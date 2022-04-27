import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {iconsSrc} from "../icons-path";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {PostControls} from "../controls";
import {Post} from "../post";
import {CrudService} from "../services/crud/crud.service";
import {Collections} from "../services/crud/collections";
import {UploadService} from "../services/crud/upload.service";
import {combineLatest, takeWhile} from "rxjs";

@Component({
  selector: 'app-account-popup',
  templateUrl: './account-popup.component.html',
  styleUrls: ['./account-popup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AccountPopupComponent implements OnInit {

  public imageSrc: string | null = '';

  public progress: string | undefined = '';

  public icons = iconsSrc;

  public isImage: boolean = false;

  public myForm: FormGroup = new FormGroup({});

  public formControls: typeof PostControls = PostControls;

  constructor(private crudService: CrudService,
              private uploadService: UploadService) {
  }

  ngOnInit(): void {
    this.myForm.addControl(PostControls.img, new FormControl('', Validators.required));
    this.myForm.addControl(PostControls.title, new FormControl('', Validators.required));
    this.myForm.addControl(PostControls.description, new FormControl('', Validators.required));
  }

  public addPost(post: Post): void {
    this.crudService.createObject(Collections.POSTS, post).subscribe();
  }

  public submitFrom(): void {
    if (this.myForm.valid) {
      const post: Post = {
        photo: this.imageSrc,
        title: this.myForm?.controls[PostControls.title].value,
        description: this.myForm?.controls[PostControls.description].value,
        likes: 23,
        comments: 2
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
      if (eventTarget && eventTarget.files) {
        const file: File = eventTarget.files[0];
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
  }
}
