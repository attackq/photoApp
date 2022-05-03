import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {iconsSrc} from "../../../icons-path";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormControls} from "../../../controls";
import {CrudService} from "../../../services/crud/crud.service";
import {EditDescription} from "../../../post";
import {Collections} from "../../../services/crud/collections";

@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrls: ['./edit-popup.component.css'],
})

export class EditPopupComponent implements OnInit {

  @Input()
  public postID: string = '';

  public icons = iconsSrc;

  public editPostForm: FormGroup = new FormGroup({});

  public formControls: typeof FormControls = FormControls;

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.editPostForm.addControl(FormControls.title, new FormControl('', Validators.required));
    this.editPostForm.addControl(FormControls.description, new FormControl('', Validators.required));
  }

  public isControlValid(controlName: string): boolean {
    const control: AbstractControl | undefined = this.editPostForm?.controls[controlName];
    if (control) {
      return control.invalid && (control.dirty || control.touched);
    } else {
      return false;
    }
  }

  public updateDescription(id: string): void {
    const newDescription: EditDescription = {
      title: this.editPostForm.controls[FormControls.title].value,
      description: this.editPostForm.controls[FormControls.description].value
    }
    this.crudService.updateObject(Collections.POSTS, id, newDescription).subscribe();
  }

}

