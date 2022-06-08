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
  @Input()
  public postDesc: string = '';
  @Input()
  public postTitle: string = '';

  public icons = iconsSrc;

  public editPostForm: FormGroup = new FormGroup({});

  public formControls: typeof FormControls = FormControls;

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.editPostForm.addControl(FormControls.title, new FormControl('', Validators.maxLength(25)));
    this.editPostForm.addControl(FormControls.description, new FormControl('', Validators.maxLength(200)));
  }

  public isControlValid(controlName: string): boolean {
    const control: AbstractControl | undefined = this.editPostForm?.controls[controlName];
    if (control) {
      if (control.value && control.value.match(/^[ ]+$/)) {
        control.setValue(control.value.trim());
      }
      return control.invalid && (control.dirty || control.touched);
    } else {
      return false;
    }
  }

  public updateDescription(id: string): void {
    const newDescription: EditDescription = {
      title: this.editPostForm.controls[FormControls.title].value.trim() || this.postTitle,
      description: this.editPostForm.controls[FormControls.description].value.trim() || this.postDesc
    }
    this.crudService.updateObject(Collections.POSTS, id, newDescription).subscribe();
  }

}

