import { Injectable } from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {from, map, Observable, startWith, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private storage: AngularFireStorage) { }

  public uploadFileAndGetMetadata(mediaFolderPath: string, fileToUpload: File): [percent: Observable<string | undefined>, link: Observable<string | null>] {
    const {name} = fileToUpload;
    const filePath = `{posts}/${new Date().getTime()}_${name}}`;
    const uploadTask: AngularFireUploadTask = this.storage.upload(filePath, fileToUpload)
    return [
      uploadTask.percentageChanges().pipe(map((value: number | undefined) => value?.toString())),
      this.getDownloadUrl$(uploadTask, filePath).pipe(startWith(null)),
    ];
  }

  private getDownloadUrl$(uploadTask: AngularFireUploadTask, path: string): Observable<string> {
    return from(uploadTask).pipe(switchMap((_) => {
      return this.storage.ref(path).getDownloadURL();
    }))
  }

  public deleteFile(imageLink: string) {
    return from(this.storage.storage.refFromURL(imageLink).delete());
  }
}
