import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';

@inject(DataServices)
export class Galleries {

  constructor(data) {
    this.data = data;
    this.GALLERIES_SERVICE = 'galleries';

    this.galleriesArray = [];
  }

  async getUserGalleries(id){
    let response = await this.data.get(this.GALLERIES_SERVICE + "/user/" + id);
    if(!response.error && !response.message){
      this.galleriesArray = response;
    }
  }

  async save(gallery) {
    if (gallery) {
      if (!gallery._id) {
        let response = await this.data.post(gallery, this.GALLERIES_SERVICE);
        if (!response.error) {
          this.galleriesArray.push(response);
        }
        return response;
      } else {
        let response = await this.data.put(gallery, this.GALLERIES_SERVICE + "/" + gallery._id);
        if (!response.error) {
          // this.updateArray(response);
        }
        return response;
      }
    }
  }

  async deleteGallery(id){
    let response = await this.data.delete(this.GALLERIES_SERVICE + "/" + id);
    if(!response.error){
      for(let i = 0; i < this.galleriesArray.length; i++){
        if(this.galleriesArray[i]._id === id){
          this.galleriesArray.splice(i,1);
        }
      }
    }
  }

  async uploadFile(files, userId, galleryId){
    let formData = new FormData();

    files.forEach((item, index) => {
      formData.append("file" + index, item);
    });

    let response = await this.data.uploadFiles(formData, this.GALLERIES_SERVICE + "/upload/" + userId + "/" + galleryId);
    return response;
  }
}
