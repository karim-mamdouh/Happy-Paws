import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable, take } from 'rxjs';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  // HTML
  // <input type="file" name="file" id="file" (change)="onfileupload($event)">

  // Component
  // selectedFile:File | undefined;
  //  onfileupload(event:any){
  // this.selectedFile = event.target.files[0];
  // console.log(this.selectedFile);
  // this.storage.uploadFile(this.selectedFile,localStorage.getItem('userID')!);
  //  }
  private basePath = '/images';
  url = '';
  downloadURL: Observable<string> | undefined;
  constructor(
    private afStorage: AngularFireStorage,
    private database: DatabaseService
  ) {}

  //method to upload file at firebase storage
  uploadFile(file: File) {
    if (file !== undefined) {
      const filePath = `${this.basePath}/${file.name}`; //path at which image will be stored in the firebase storage
      const fileRef = this.afStorage.ref(filePath);
      const task = this.afStorage.upload(filePath, file);
      // get notified when the download URL is available
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.pipe(take(1)).subscribe((url) => {});
        })
      );
    }
  }
}
