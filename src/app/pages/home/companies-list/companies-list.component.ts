import { UserService } from './../../../shared/services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/Users';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.scss'],
})
export class CompaniesListComponent implements OnInit, OnDestroy {
  state = {
    users: [] as User[],
    subscription: [] as Subscription[],
  };
  uiState = {
    isLoading: false,
    error: false,
  };

  constructor(private userService: UserService, private router: Router) {}
  ngOnInit() {
    this.getAllCompanies();
  }

  getAllCompanies() {
    this.uiState.isLoading = true;
    let sub = this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.state.users = res;
        this.uiState.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.uiState.isLoading = false;
      },
    });

    this.state.subscription.push(sub);
  }

  ngOnDestroy(): void {
    this.state.subscription &&
      this.state.subscription.forEach((s) => s.unsubscribe());
  }
}
