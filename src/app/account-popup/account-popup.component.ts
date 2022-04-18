import { Component, OnInit } from '@angular/core';
import {iconsSrc} from "../icons-path";

@Component({
  selector: 'app-account-popup',
  templateUrl: './account-popup.component.html',
  styleUrls: ['./account-popup.component.css']
})
export class AccountPopupComponent implements OnInit {

  public imageSrc: string | ArrayBuffer | null = '';

  public icons = iconsSrc;
  isImage = false;

  constructor() { }

  ngOnInit(): void {
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
