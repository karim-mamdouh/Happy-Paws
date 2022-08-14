import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { last, map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private basePath = '/images';
  downloadURL: Observable<string> | undefined;
  constructor(private afStorage: AngularFireStorage) {}

  //method to upload file at firebase storage
  uploadFile(file: File) {
    const filePath = `${this.basePath}/${file.name}`; //path at which image will be stored in the firebase storage
    const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file);
    // get notified when the download URL is available
    return task.snapshotChanges().pipe(
      last(),
      map(() => {
        this.downloadURL = fileRef.getDownloadURL();
        return this.downloadURL.pipe(take(1));
      })
    );
  }
}
