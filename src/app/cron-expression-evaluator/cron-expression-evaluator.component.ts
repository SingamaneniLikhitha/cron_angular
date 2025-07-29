import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cron-expression-evaluator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cron-expression-evaluator.component.html',
  styleUrls: ['./cron-expression-evaluator.component.css']
})
export class CronExpressionEvaluatorComponent {
  cronExpression: string = '';
  cronFields = { seconds: '*', minutes: '*', hours: '*', days: '*', month: '*', dayOfWeek: '*' };
  activeFields = { seconds: false, minutes: false, hours: false, days: false, month: false, dayOfWeek: false };

  onCronChange(value: string | Event) {
    const input = typeof value === 'string' ? value : (value.target as HTMLInputElement).value;
    this.cronExpression = input.trim();

    const parts = this.cronExpression.split(/\s+/);
    if (parts.length !== 6) {
      this.resetFields();
      return;
    }

    const keys = Object.keys(this.cronFields) as (keyof typeof this.cronFields)[];
    keys.forEach((key, index) => {
      this.cronFields[key] = parts[index];
      this.activeFields[key] = parts[index] !== '*';
    });
  }

  resetFields() {
    const keys = Object.keys(this.cronFields) as (keyof typeof this.cronFields)[];
    keys.forEach((key) => {
      this.cronFields[key] = '*';
      this.activeFields[key] = false;
    });
  }
}
