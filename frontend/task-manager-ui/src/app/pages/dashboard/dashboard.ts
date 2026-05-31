import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  tasks: any[] = [];
  todo: any[] = [];
  inProgress: any[] = [];
  done: any[] = [];

  title = '';
  description = '';
  stage = 'Todo';

  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.isLoading = true;

    this.taskService.getTasks().subscribe({
      next: (data: any) => {
        this.tasks = data || [];
        this.groupTasks();
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load tasks. Please check if backend is running.';
        this.successMessage = '';
        this.isLoading = false;
      }
    });
  }

  groupTasks() {
    this.todo = this.tasks.filter(task => task.stage === 'Todo');
    this.inProgress = this.tasks.filter(task => task.stage === 'In Progress');
    this.done = this.tasks.filter(task => task.stage === 'Done');
  }

  addTask() {
    if (!this.title.trim() || !this.description.trim()) {
      this.errorMessage = 'Please enter both task title and description.';
      this.successMessage = '';
      return;
    }

    const task = {
      title: this.title.trim(),
      description: this.description.trim(),
      stage: this.stage
    };

    this.taskService.createTask(task).subscribe({
      next: () => {
        this.title = '';
        this.description = '';
        this.stage = 'Todo';
        this.successMessage = 'Task added successfully.';
        this.errorMessage = '';
        this.loadTasks();
      },
      error: () => {
        this.errorMessage = 'Failed to add task.';
        this.successMessage = '';
      }
    });
  }

  changeStage(task: any, newStage: string) {
    const updatedTask = {
      title: task.title,
      description: task.description,
      stage: newStage
    };

    this.taskService.updateTask(task.id, updatedTask).subscribe({
      next: () => {
        this.successMessage = 'Task status updated successfully.';
        this.errorMessage = '';
        this.loadTasks();
      },
      error: () => {
        this.errorMessage = 'Failed to update task status.';
        this.successMessage = '';
      }
    });
  }

  deleteTask(id: number) {
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.successMessage = 'Task deleted successfully.';
        this.errorMessage = '';
        this.loadTasks();
      },
      error: () => {
        this.errorMessage = 'Failed to delete task.';
        this.successMessage = '';
      }
    });
  }

  logout() {
    this.successMessage = '';
    this.errorMessage = '';
    window.location.href = '/';
  }
}