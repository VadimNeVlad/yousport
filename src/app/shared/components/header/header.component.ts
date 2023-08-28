import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() isLoggedIn = false;
  @Input() user: User | null = null;

  @Output() logout = new EventEmitter<void>();

  constructor() {}

  onLogout(): void {
    this.logout.emit();
  }
}
