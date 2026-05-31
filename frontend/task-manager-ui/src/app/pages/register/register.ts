import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  username = '';
  password = '';
  message = '';
  errorMessage = '';

  constructor(private taskService: TaskService, private router: Router) {}

  register() {
    const data = {
      username: this.username,
      password: this.password
    };

    this.taskService.register(data).subscribe({
      next: () => {
        this.message = 'Registration successful. Please login.';
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000);
      },
      error: () => {
        this.errorMessage = 'User already exists or registration failed';
      }
    });
  }
}