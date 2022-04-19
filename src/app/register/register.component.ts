import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import RegisterUser from '../RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public registerUser: RegisterUser = {
    userName: '',
    password: '',
    password2: '',
  };
  public warning: string = '';
  public success: boolean = false;
  public loading: boolean = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (
      this.registerUser.password !== this.registerUser.password2 &&
      this.registerUser.userName !== ''
    ) {
      this.warning = 'Passwords do not match!';
    }
    if (
      this.registerUser.userName !== '' &&
      this.registerUser.password === this.registerUser.password2
    ) {
      this.loading = true;
      this.auth.register(this.registerUser).subscribe({
        next: () => {
          this.success = true;
          this.warning = '';
          this.loading = false;
        },
        error: (err) => {
          this.success = false;
          this.warning = err.error.message;
          this.loading = false;
        },
      });
    }
  }
}
