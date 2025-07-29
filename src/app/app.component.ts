import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CronExpressionEvaluatorComponent } from './cron-expression-evaluator/cron-expression-evaluator.component';
import { RecurrencePatternGeneratorComponent } from './recurrence-pattern-generator/recurrence-pattern-generator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CronExpressionEvaluatorComponent, RecurrencePatternGeneratorComponent],
  template: `
    <div class="app">
      <header class="app-header">
        <h1>Cron Expression Visualizer</h1>
      </header>
      <main>
        <div class="container">
          <h2>Part 1: Cron Expression Evaluator</h2>
          <app-cron-expression-evaluator></app-cron-expression-evaluator>
          
          <h2>Part 2: Recurrence Pattern Generator</h2>
          <app-recurrence-pattern-generator></app-recurrence-pattern-generator>
        </div>
      </main>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cron_angular';
}
