import {Input} from '@angular/core';

import { Component } from '@angular/core';

@Component({
  selector: 'leaderboard',
  template: `
<table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp" style="height: 290px;">
  <thead>
    <tr>
      <th class="mdl-data-table__cell--non-numeric">Name</th>
      <th>End Time</th>
      <th>Moves</th>
    </tr>
  </thead>
  <tbody style="color: #777777;">
    <tr *ngFor="let score of scores.slice(0,5)">
      <td class="mdl-data-table__cell--non-numeric">{{score.nickname}}</td>
      <td>{{score.time_left | date:'mm:ss'}}</td>
      <td>{{score.score}}</td>
    </tr>
  </tbody>
</table>
  `
})
export class LeaderboardComponent {
  @Input() scores;
}