import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dummy-page',
  imports: [RouterLink,RouterOutlet,RouterLinkActive],
  templateUrl: './dummy-page.component.html',
  styleUrl: './dummy-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DummyPageComponent {

}
