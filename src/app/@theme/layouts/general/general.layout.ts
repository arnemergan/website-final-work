import { Component } from '@angular/core';

@Component({
  selector: 'ngx-general-layout',
  styleUrls: ['./general.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header>
        <ngx-general-header></ngx-general-header>
      </nb-layout-header>
      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class GeneralLayoutComponent {}
