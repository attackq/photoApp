import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {iconsSrc} from "../../../icons-path";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {PostControls} from "../../../controls";
import {CrudService} from "../../../services/crud/crud.service";
import {EditDescription} from "../../../post";
import {Collections} from "../../../services/crud/collections";

@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrls: ['./edit-popup.component.css'],
  encapsulation: ViewEncapsulation.None

})

export class EditPopupComponent implements OnInit {

  @Input()
  public postID: string = '';

  public icons = iconsSrc;

  public myForm: FormGroup = new FormGroup({});

  public formControls: typeof PostControls = PostControls;

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.myForm.addControl(PostControls.title, new FormControl('', Validators.required));
    this.myForm.addControl(PostControls.description, new FormControl('', Validators.required));
  }

  public isControlValid(controlName: string): boolean {
    const control: AbstractControl | undefined = this.myForm?.controls[controlName];
    if (control) {
      return control.invalid && (control.dirty || control.touched);
    } else {
      return false;
    }
  }

  public updateDescription(id: string): void {
    const newDescription: EditDescription = {
      title: this.myForm.controls[PostControls.title].value,
      description: this.myForm.controls[PostControls.description].value
    }
    this.crudService.updateObject(Collections.POSTS, id, newDescription).subscribe();
  }

}

