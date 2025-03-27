import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-signal-example',
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './signal-example.component.html',
  styleUrl: './signal-example.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SignalExampleComponent {
  protected readonly count = signal(0);
  protected readonly doublecount = computed(() => this.count() * 2);
  protected readonly isEven = computed(() => this.count() % 2 === 0);

  private intervalHandler!: number;
  constructor() {
    const destroyRef = inject(DestroyRef);
    const intervalHandler = setInterval(() => {
      this.count.update(value => value + 1);
      console.log(this.count)
    }, 1_000);
    destroyRef.onDestroy(() => {
      clearInterval(intervalHandler)
    });

  }

  formatTime(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    if (h > 0) {
      return `${h}h ${m}m ${s}s`; // แสดงเป็น "1h 5m 30s"
    } else {
      return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`; // แสดงเป็น "05:30"
    }
  }
}
