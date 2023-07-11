import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm?: FormGroup;
  forbiddenUserName: string[] = ['Fahad', 'Chris'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      // group username & email (nesting form )
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.checkUserName.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmail
        ),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([]),
    });

    // listening to status and value change in my reactive form
    // this.signupForm.valueChanges.subscribe((value) => console.log(value));
    this.signupForm.statusChanges.subscribe((value) => console.log(value));
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  getHobbies() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  onAddHobbie() {
    (<FormArray>this.signupForm.get('hobbies')).push(
      new FormControl(null, Validators.required)
    );
  }

  checkUserName(control: FormControl): { [i: string]: boolean } {
    if (this.forbiddenUserName.indexOf(control.value) !== -1) {
      return { usernameIsForbidden: true };
    }
    return null;
  }

  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    return new Promise((resolve, rejected) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({
            emailIsForbidden: true,
          });
        } else {
          resolve(null);
        }
      }, 1500);
    });
  }
}
