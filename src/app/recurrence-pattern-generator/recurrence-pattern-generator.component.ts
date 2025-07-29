import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recurrence-pattern-generator',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './recurrence-pattern-generator.component.html',
  styleUrls: ['./recurrence-pattern-generator.component.css']
})
export class RecurrencePatternGeneratorComponent {
  Object = Object;

  weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  pattern: string = 'daily';
  time: string = '12:00';
  date: string = '1';
  selectedDays: { [key: string]: boolean } = {
    monday: false, tuesday: false, wednesday: false,
    thursday: false, friday: false, saturday: false, sunday: false
  };
  description: string = '';

  ngOnInit() {
    this.generateDescription();
  }

  onPatternChange(value: string) {
    this.pattern = value;
    this.generateDescription();
  }

  onTimeChange(value: string) {
    this.time = value;
    this.generateDescription();
  }

  toggleDay(day: string) {
    this.selectedDays[day] = !this.selectedDays[day];
    this.generateDescription();
  }

  onDateChange(value: string) {
    this.date = value;
    this.generateDescription();
  }

  generateDescription() {
    const timeStr = this.time;

    if (this.pattern === 'daily') {
      this.description = `Runs every day at ${timeStr}.`;
    } else if (this.pattern === 'weekly') {
      const selected = this.getDaysKeys().filter(day => this.selectedDays[day]);
      if (selected.length > 0) {
        const dayList = selected.map(day => this.capitalize(day)).join(', ');
        this.description = `Runs every week on ${dayList} at ${timeStr}.`;
      } else {
        this.description = `Runs every week at ${timeStr}.`;
      }
    } else if (this.pattern === 'monthly') {
      const dayWithSuffix = this.ordinalSuffix(this.date);
      this.description = `Runs every month on the ${dayWithSuffix} day at ${timeStr}.`;
    }
  }

  capitalize(day: string): string {
    return day.charAt(0).toUpperCase() + day.slice(1);
  }

  ordinalSuffix(day: string): string {
    const num = parseInt(day, 10);
    if (isNaN(num)) return day;
    const remainder10 = num % 10;
    const remainder100 = num % 100;

    if (remainder10 === 1 && remainder100 !== 11) return `${num}st`;
    if (remainder10 === 2 && remainder100 !== 12) return `${num}nd`;
    if (remainder10 === 3 && remainder100 !== 13) return `${num}rd`;
    return `${num}th`;
  }

  getDaysKeys() {
    return Object.keys(this.selectedDays);
  }
}
