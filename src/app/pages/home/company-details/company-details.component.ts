import { User } from './../../../shared/models/Users';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss'],
})
export class CompanyDetailsComponent implements OnInit, OnDestroy {
  state = {
    user: {} as User,
    userId: 0,
    subscription: [] as Subscription[],
  };
  uiState = {
    isLoading: false,
    error: false,
  };

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.state.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.getUserDetails(this.state.userId);
  }

  getUserDetails(id: number) {
    this.uiState.isLoading = true;
    let sub = this.userService.getUserById(id).subscribe({
      next: (res) => {
        console.log(res);

        this.state.user = res;
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
