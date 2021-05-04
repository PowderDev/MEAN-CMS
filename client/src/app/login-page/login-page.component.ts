import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from '../shared/classes/material.service';
import { User } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form!: FormGroup
  aSub$!: Subscription

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private material: MaterialService
  ) { }

  ngOnInit() {
    this.material.dismissToasts()
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(25)])
    })

    this.route.queryParams
      .subscribe(params => {
        if (params.accessDenied) {
          this.material.toast('First you need to login')
        } else if (params.sessionExpired) {
          this.material.toast('Please, login again')
        }
      })
  }

  ngOnDestroy() {
    if (this.aSub$) this.aSub$.unsubscribe()
  }

  submit() {
    if (this.form.invalid) return
    this.form.disable()

    this.aSub$ = this.auth.login(this.form.value)
      .subscribe(
        () => {
          this.material.dismissToasts()
          this.router.navigate(['/overview'])
        },
        (err) => {
          this.material.toast(err.error.message)
          this.form.enable()
        }
      )
  }
}
