import {Input} from '@angular/core';

import { Component } from '@angular/core';

@Component({
  selector: 'leaderboard',
  template: `

    <h1>Leaderboard</h1>

    <table>
      <tr>
        <th>Name</th>
        <th>End Time</th>
        <th>Moves</th>
      </tr>
      <tr *ngFor="let score of scores.slice(0,5)" [ngClass]='highlighted'>
        <td>{{score.nickname}}</td>
        <td>{{score.time_left | date:'mm:ss'}}</td>
        <td>{{score.score}}</td>
      </tr>
    </table>
  `
})
export class LeaderboardComponent {
  @Input() scores;
}