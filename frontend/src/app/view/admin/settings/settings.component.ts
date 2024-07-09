import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UploadImgType} from "../../../../types/upload-img.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {SettingsService} from "../../../shared/services/settings.service";
import {PostService} from "../../../shared/services/post.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, Validators} from "@angular/forms";
import {UserInfoType} from "../../../../types/userInfo.type";
import {AuthService} from "../../../core/auth.service";

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit{

  adminFormFlag: boolean = false;
  createNewAdminFlag: boolean = false;
  pageSettingsFlag: boolean = true;
  formData: FormData | null = null;

  img: string = '';

  showPassword: boolean = false;

  passwordType: string = 'password'

  adminForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.email],
    password: ['', Validators.required],
    newPassword: ['', Validators.required],
    newPasswordConfirm: ['', Validators.required]
  })

  settingsForm = this.fb.group({
    companyName: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
    fax: ['', Validators.required],
    businessHours: ['', Validators.required],
    metaTitle: ['', Validators.required],
    metaDesc: ['', Validators.required],
    addressOnMap: ['', Validators.required]
  })



  imgIsAdded: boolean = false;

  logoIsAdded: boolean = false;
  constructor(private settingsService: SettingsService, private postService: PostService,
              private snackBar: MatSnackBar, private fb: FormBuilder) {
  }

  ngOnInit() {

  this.getAdminsInfo();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.uploadFile(file);
    }
  }

  uploadFile(file: File): void {
    this.formData = new FormData();
      this.formData.append('image', file);
      this.postService.sendUploadedImage(this.formData).subscribe({
        next: (data: UploadImgType | DefaultResponseType) => {
          this.img = (data as UploadImgType).image as string;
          this.imgIsAdded = true;
        },
        error: (error) => this.snackBar.open(error.message)
      });

  }

  deleteUploadedImg(img: string) {
    this.postService.deleteUploadedImg(img)
      .subscribe({
        next: (response: DefaultResponseType) => {
          if(response.success === 0) {
            this.snackBar.open(response.message);
          }

          this.imgIsAdded = false;
        },
        error: (error: HttpErrorResponse) => {
          throw new Error(error.message);
        }
      })
  }

  togglePassword() {
      this.showPassword = !this.showPassword;
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  updateAdminInfo() {
    const id = localStorage.getItem('userId');
    if(id && this.adminForm.value.name
      && this.adminForm.value.email
      && this.adminForm.value.password
      && this.adminForm.value.newPassword
      && this.adminForm.value.newPasswordConfirm)
    this.settingsService.updateAdminsInfo(
      JSON.parse(id as string), this.img ? this.img : '',
      this.adminForm.value.name,
      this.adminForm.value.email,
      this.adminForm.value.password,
      this.adminForm.value.newPassword,
      this.adminForm.value.newPasswordConfirm
    ) .subscribe({
      next: (response: DefaultResponseType) => {
        if(response.success === 0 ) {
          throw new Error(response.message)
        }

        this.snackBar.open(response.message);
        this.adminForm.setValue({
          name: this.adminForm.value.name as string,
          email: this.adminForm.value.email as string,
          password: '',
          newPassword: '',
          newPasswordConfirm: ''
        })

      },
      error: (error) => {

      }
    })
  }

  createNewAdmin() {
    if(this.adminForm.value.name && this.adminForm.value.email && this.adminForm.value.password && this.adminForm.value.newPasswordConfirm) {
      this.settingsService.createNewAdmin(this.adminForm.value.name , this.adminForm.value.email , this.adminForm.value.password , this.adminForm.value.newPasswordConfirm)
        .subscribe({
          next: (response: DefaultResponseType) => {
            if(response.success === 0) {
              throw new Error(response.message)
            }
            this.snackBar.open(response.message);
            this.changeTheInnerSettings('create-new')
            console.log(response)

          }
        })
    }
  }

  getAdminsInfo() {
    this.settingsService.getUserInfo()
      .subscribe({
        next: (response: DefaultResponseType | UserInfoType) => {
          if((response as DefaultResponseType).success === 0) {
            this.snackBar.open((response as DefaultResponseType).message);
          }

          this.adminForm.setValue({
            name: (response as UserInfoType).authUser.name,
            email: (response as UserInfoType).authUser.email,
            password: '',
            newPassword: '',
            newPasswordConfirm: ''
          })
        }
      })
  }
  changeTheInnerSettings(flag: string) {
    if(flag === 'admin-info') {
      this.getAdminsInfo();
      this.adminFormFlag = true;
      this.pageSettingsFlag = false;
      this.createNewAdminFlag = false;
    } else if(flag === 'create-new') {
      this.adminForm.setValue({
        name: '',
        email: '',
        password: '',
        newPassword: '',
        newPasswordConfirm: ''
      })
      this.adminFormFlag = false;
      this.createNewAdminFlag = true;
      this.pageSettingsFlag = false;
    } else if(flag === 'settings') {
      this.adminFormFlag = false;
      this.createNewAdminFlag = false;
      this.pageSettingsFlag = true;
    }
  }

  updateSettings() {
    this.settingsService.updateSettings(this.img, this.settingsForm.value.companyName as string,
      this.settingsForm.value.address as string,
      this.settingsForm.value.phone as string,
      this.settingsForm.value.email as string,
      this.settingsForm.value.fax as string,
      this.settingsForm.value.businessHours as string,
      this.settingsForm.value.metaTitle as string,
      this.settingsForm.value.metaDesc as string,
      this.settingsForm.value.addressOnMap as string)
      .subscribe({
        next: (response: DefaultResponseType) => {
          if(response.success === 0) {
            throw new Error(response.message)
          }

          this.snackBar.open(response.message);
        }
      })
  }
}
