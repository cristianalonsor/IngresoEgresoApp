import { Component, OnInit, OnDestroy } from '@angular/core';
import { filter, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {

  userSubscription!: Subscription;
  userName;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('auth')
      .pipe(filter(({ user }) => user !== null))
      .subscribe(({ user }) => {
        this.userName = user?.nombre;
      })
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
