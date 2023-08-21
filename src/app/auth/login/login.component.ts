import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private toastr: ToastrService) {}

  loginUser(event: FormGroup): void {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
