import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ProfileFormComponent } from '../../components/profile-form/profile-form.component';
import { ProfileDataService } from '../../services/profile-data.service';
import { Profile } from '../../models';

@Component({
  selector: 'app-profile-form-page',
  imports: [ProfileFormComponent],
  templateUrl: './profile-form-page.component.html',
  styleUrl: './profile-form-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFormPageComponent {
  private readonly service = inject(ProfileDataService);

  // ✅ ใช้ Angular Signal แทน single()
  protected readonly data = signal<Profile | undefined>(undefined);

  constructor() {
    (async () => {
      const data = await this.service.get();
      this.data.set(data ?? undefined);
    })();
  }
}
