import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckLengthService {

  private readonly MAX_NICKNAME_CROPPED: number = 8;

  public checkUsernameLength(nickname: string) {
    if (nickname.length > this.MAX_NICKNAME_CROPPED && !nickname.includes(' ')) {
      return nickname.substring(0, this.MAX_NICKNAME_CROPPED) + '...';
    } else {
      return nickname;
    }
  }

  constructor() { }
}
