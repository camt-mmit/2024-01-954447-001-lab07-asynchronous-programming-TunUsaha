import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  linkedSignal,
  model,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Profile } from '../../models';

@Component({
  selector: 'app-profile-form',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileFormComponent {
  private readonly fb = inject(FormBuilder).nonNullable;

  readonly data = model<Profile>();

  //fution for create form ? for offtional
  private readonly createFriend = (friend?: string) => {
    const fb = this.fb;

    return fb.control(friend ?? '', { updateOn: 'blur' });
  };

  private readonly createFormGroup = (data?: Profile) => {
    const fb = this.fb;

    return fb.group({
      studentID: fb.control(data?.studentID ?? '', { updateOn: 'blur' }), //not error but show undifile ?? for '' แทน
      firstname: fb.control(data?.firstname ?? '', { updateOn: 'blur' }),
      lastname: fb.control(data?.lastname ?? '', { updateOn: 'blur' }),
      age: fb.control(data?.age ?? null!, { updateOn: 'blur' }),
      autobiography: fb.control(data?.autobiography ?? '', {
        updateOn: 'blur',
      }),
      friends: fb.array((data?.friends ?? [undefined]).map(this.createFriend)),
    });
  };

  protected readonly formGroup = computed(() =>
    this.createFormGroup(this.data())
  );

  protected readonly friendsFormArray = computed(
    () => this.formGroup().controls.friends
  );

  constructor() {
    effect((onDestroy) => {
      const subscription = this.formGroup().valueChanges.subscribe(() => {
        const rawValue = this.formGroup().getRawValue();
        this.data.set(rawValue);
      });

      onDestroy(() => subscription.unsubscribe());
    });
  }


  protected addFriend(): void {
    this.friendsFormArray().push(this.createFriend());
  }

  protected removeFriend(index: number): void {
    this.friendsFormArray().removeAt(index);
  }

  protected moveFriend(index: number, offset: number): void {
    const tmp = this.friendsFormArray().controls[index + offset];
    this.friendsFormArray().controls[index + offset] =
      this.friendsFormArray().controls[index];
    this.friendsFormArray().controls[index] = tmp;

    this.friendsFormArray().updateValueAndValidity();
  }

  protected readonly XXXX = linkedSignal<
  ReturnType<typeof this.data>,
  ReturnType<typeof this.createFormGroup>
>({
  source: this.data,
  computation: (data, previous) => {
    if (
      typeof previous === 'undefined' ||
      !Object.is(data, previous?.value?.getRawValue?.())
    ) {
      return this.createFormGroup(data);
    } else {
      return previous.value;
    }
  },
});

}
