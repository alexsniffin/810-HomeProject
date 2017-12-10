import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Galleries} from '../resources/data/galleries';
import {AuthService} from 'aurelia-auth';

@inject(Router, AuthService, Galleries)
export class List {
  constructor(router, auth, galleries) {
    this.galleries = galleries;
    this.currentGallery = undefined; // undefined for init message

    this.router = router;
    this.apiUrl = "http://127.0.0.1:5000/api";
    this.message = 'MyPics Gallery Viewer';
    this.auth = auth;

    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.showList = true;
    this.showCompleted = false;

    this.files = [];

    this.priorities = ['Low', 'Medium', 'High', 'Critical'];
  }

  logout(){
    sessionStorage.removeItem('user');
    this.auth.logout();
  }

  async activate() {
    await this.galleries.getUserGalleries(this.user._id);
  }

  toggleShowCompleted(){
    this.showCompleted = !this.showCompleted;
  }

  createGallery(){
    this.galleryObj = {
      user: this.user._id,
      name: "",
      dateCreated: new Date()
    };
    this.showList = false;
  }

  back() {
    this.showList = true;
  }

  editGallery(gallery){
    this.galleryObj = gallery;
    this.showList = false;
  }

  deleteGallery(gallery){
    this.galleries.deleteGallery(gallery._id);
  }

  completeGallery(gallery){
    gallery.completed = !gallery.completed;
    this.galleryObj = gallery;
    this.saveGallery();
  }

  changeFiles(){
    this.filesToUpload = new Array();

    for(let picture of this.files) {
      this.filesToUpload.push(picture);
    }
  }

  removeFile(index){
    this.filesToUpload.splice(index,1);
  }

  showGallery(gallery) {
    this.currentGallery = gallery.file;
  }

  async saveGallery(){
    if(this.galleryObj){
      let response = await this.galleries.save(this.galleryObj);
      if(response.error){
        alert("There was an error creating the Gallery");
      } else {
        var galleryId = response._id;

        if(this.filesToUpload && this.filesToUpload.length){
          await this.galleries.uploadFile(this.filesToUpload, this.user._id, galleryId);
          this.filesToUpload = [];
        }
      }
      this.showList = true;
    }
  }
}
