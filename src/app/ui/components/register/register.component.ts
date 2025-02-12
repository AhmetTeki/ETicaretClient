import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Create_User } from 'src/app/contracts/user/create_user';
import { User } from 'src/app/entitis/user';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastService: ToastrService
  ) {}

  frm: FormGroup;

  ngOnInit(): void {
    this.frm = this.formBuilder.group(
      {
        nameSurname: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(3),
          ],
        ],
        userName: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(3),
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(3),
            Validators.email,
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(3),
          ],
        ],
        passwordConfirm: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(3),
          ],
        ],
      },
      {
        validators: (group: AbstractControl): ValidationErrors | null => {
          let sifre = group.get('password').value;
          let sifreTekrar = group.get('passwordConfirm').value;

          return sifre === sifreTekrar ? null : { notSame: true };
        },
      }
    );
  }
  get component() {
    return this.frm.controls;
  }

  submited: boolean = false;
  async onSubmit(user: User) {
    this.submited = true;
    if (this.frm.invalid) return;

    const result: Create_User = await this.userService.create(user);
    if (result.succeded) {
      console.log('başarılı');
    } else {
      console.log('başarısız');
    }
  }
}
