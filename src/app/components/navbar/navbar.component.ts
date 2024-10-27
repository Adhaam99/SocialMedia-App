import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../core/interfaces/user';
import { UsersService } from '../../core/services/users.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  getUserDataApi!: Subscription;
  userData: User = {} as User;
  savedPhotoFile!: File;

  private readonly _Router = inject(Router);
  private readonly _UsersService = inject(UsersService);

  logout = () => {
    this._Router.navigate(['/login']);
    localStorage.removeItem('userToken');
  };

  getUserData = () => {
    this.getUserDataApi = this._UsersService.getUserData().subscribe({
      next: (res) => {
        this.userData = res.user;
      },
    });
  };

  selectImage = (e: Event) => {
    const input = e.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.savedPhotoFile = input.files[0];
    }
  };

  uploadPhoto = () => {
    const formData = new FormData();

    formData.append('photo', this.savedPhotoFile);

    this._UsersService.uploadProfilePhoto(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.getUserData();
      },
    });
  };

  ngOnInit(): void {
    this.getUserData();
  }
}
