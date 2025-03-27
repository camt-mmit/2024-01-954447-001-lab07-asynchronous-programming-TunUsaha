import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile-view-page',
  imports: [RouterLink,RouterOutlet,RouterLinkActive],
  templateUrl: './profile-view-page.component.html',
  styleUrl: './profile-view-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileViewPageComponent {

}
