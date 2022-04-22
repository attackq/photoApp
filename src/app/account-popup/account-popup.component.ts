import {Component, OnInit} from '@angular/core';
import {iconsSrc} from "../icons-path";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {PostControls} from "../controls";
import {Post} from "../post";
import {CrudService} from "../services/crud/crud.service";
import {Collections} from "../services/crud/collections";

@Component({
  selector: 'app-account-popup',
  templateUrl: './account-popup.component.html',
  styleUrls: ['./account-popup.component.css']
})
export class AccountPopupComponent implements OnInit {

  public imageSrc: string | ArrayBuffer | null = '';

  public icons = iconsSrc;

  public isImage: boolean = false;

  public myForm: FormGroup = new FormGroup({});

  public formControls: typeof PostControls = PostControls;

  constructor(private crudService: CrudService) {
  }

  ngOnInit(): void {
    this.myForm.addControl(PostControls.title, new FormControl('', Validators.required));
    this.myForm.addControl(PostControls.description, new FormControl('', Validators.required));
  }

  public addPost(post: Post): void {
    this.crudService.createObject(Collections.POSTS, post).subscribe();
  }

  public submitFrom(): void {
    if (this.myForm.valid) {
      const post: Post = {
        photo: 'https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0,176,3008,1654&wid=4000&hei=2200&scl=0.752',
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

  public readUrl(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    }
    this.isImage = true;
  }


  public deleteUrl(): void {
    this.imageSrc = '';
    this.isImage = false;
  }
}
