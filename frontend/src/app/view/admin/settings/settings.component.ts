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
import {GeneralSettingsType} from "../../../../types/general-settings.type";
import {UploadLogoType} from "../../../../types/upload-logo.type";

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit{


  // FLAGS //
  adminFormFlag: boolean = false;
  createNewAdminFlag: boolean = false;
  pageSettingsFlag: boolean = true;

  ///////
  formData: FormData | null = null;


////////////IMAGES ///////////////
  img: string = '';
  newAdminImg: string = '';

  logoImg: string = '';

  imgIsAdded: boolean = false;

  newAdminImgIsAdded: boolean = false;

  logoIsAdded: boolean = false;
/////////////////////
  showPassword: boolean = false;

  showNewPassword: boolean = false;

  showNewPasswordConfirm: boolean = false;

  passwordType: string = 'password'
  newPasswordType: string = 'password'
  newPasswordConfirmType: string = 'password'

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




  constructor(private settingsService: SettingsService, private postService: PostService,
              private snackBar: MatSnackBar, private fb: FormBuilder) {
  }

  ngOnInit() {

  this.getAdminsInfo();
  this.getSettings();
  }

  onFileSelected(event: Event, flag: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.uploadFile(file, flag);
    }
  }

  uploadFile(file: File, flag: string): void {
    this.formData = new FormData();
      if(flag === 'logo') {
        this.formData?.append('logo', file);
        this.settingsService.sendUploadedLogo(this.formData).subscribe({
          next: (data: UploadLogoType | DefaultResponseType) => {
              this.logoImg = (data as UploadLogoType).logo as string;
              this.logoIsAdded = true;
          },
          error: (error) => this.snackBar.open(error.message)
        });
      } else {
        this.formData?.append('image', file);
        this.postService.sendUploadedImage(this.formData).subscribe({
          next: (data: UploadImgType | DefaultResponseType) => {
            if(flag === 'current') {
              this.img = (data as UploadImgType).image as string;
              this.imgIsAdded = true;
            } else if(flag === 'new') {
              this.newAdminImg = (data as UploadImgType).image as string;
              this.newAdminImgIsAdded = true;
            }

          },
          error: (error) => this.snackBar.open(error.message)
        });
      }


  }

  deleteUploadedImg(img: string, logo: boolean = false) {
    if(logo) {
      this.settingsService.deleteUploadedLogo(img)
        .subscribe({
          next: (response: DefaultResponseType) => {
            if(response.success === 0) {
              this.snackBar.open(response.message);
            }

            this.logoIsAdded = false;
          },
          error: (error: HttpErrorResponse) => {
            throw new Error(error.message);
          }
        })
    } else {
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

  }

  togglePassword() {
      this.showPassword = !this.showPassword
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }
  toggleNewPassword() {
      this.showPassword = !this.showPassword
      this.newPasswordType = this.newPasswordType ===  'password' ? 'text' : 'password';
  }  toggleNewPasswordConfirm() {
      this.showPassword = !this.showPassword
      this.newPasswordConfirmType = this.newPasswordConfirmType === 'password' ? 'text' : 'password';
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

  updateAdminInfo() {
    const id = localStorage.getItem('userId');
    if (id && this.adminForm.value.name && this.adminForm.value.email) {
      // Create an object to hold the parameters
      const updateParams: any = {
        avatar: this.img as string,
        name: this.adminForm.value.name,
        email: this.adminForm.value.email
      };

      // Add password fields if they are present
      if (this.adminForm.value.password) {
        updateParams.password = this.adminForm.value.password;
      }
      if (this.adminForm.value.newPassword) {
        updateParams.newPassword = this.adminForm.value.newPassword;
      }
      if (this.adminForm.value.newPasswordConfirm) {
        updateParams.newPasswordConfirm = this.adminForm.value.newPasswordConfirm;
      }

      this.settingsService.updateAdminsInfo(updateParams, id).subscribe({
        next: (response: DefaultResponseType) => {
          if (response.success === 0) {
            throw new Error(response.message);
          }

          this.snackBar.open(response.message);
          this.adminForm.setValue({
            name: this.adminForm.value.name as string,
            email: this.adminForm.value.email as string,
            password: '',
            newPassword: '',
            newPasswordConfirm: ''
          });
        },
        error: (error) => {
          console.error('Error updating admin info:', error);
        }
      });
    }


  }
  getAdminsInfo() {

    this.settingsService.getUserInfo()
      .subscribe({
        next: (response: DefaultResponseType | UserInfoType) => {
          if((response as DefaultResponseType).success === 0) {
            this.snackBar.open((response as DefaultResponseType).message);
          }
          this.img = (response as UserInfoType).authUser.avatar as string;
          this.imgIsAdded = true;
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

  updateSettings() {
    this.settingsService.updateSettings(this.img as string, this.settingsForm.value.companyName as string,
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

  getSettings() {
    this.settingsService.getSettings()
      .subscribe({
        next: (response: DefaultResponseType | GeneralSettingsType) => {
          if((response as DefaultResponseType).success === 0) {
            throw new Error((response as DefaultResponseType).message)
          }
          const settings = response as GeneralSettingsType
          if(settings) {
            this.logoIsAdded = true;
            this.logoImg = settings.settings.logo.setting_value as string;
            this.settingsForm.setValue({
              companyName: settings.settings.companyName.setting_value,
              address: settings.settings.address.setting_value,
              phone: settings.settings.phone.setting_value,
              email: settings.settings.email.setting_value,
              fax: settings.settings.fax.setting_value,
              businessHours: settings.settings.businessHours.setting_value,
              metaTitle: settings.settings.metaTitle.setting_value,
              metaDesc: settings.settings.metaDesc.setting_value,
              addressOnMap: settings.settings.addressOnMap.setting_value
            })
          }

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
      this.getSettings();
      this.adminFormFlag = false;
      this.createNewAdminFlag = false;
      this.pageSettingsFlag = true;
    }
  }

}
