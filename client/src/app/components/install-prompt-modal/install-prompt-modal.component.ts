import { Platform } from '@angular/cdk/platform';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-install-prompt-modal',
  templateUrl: './install-prompt-modal.component.html',
  styleUrls: ['./install-prompt-modal.component.scss']
})
export class InstallPromptModalComponent implements OnInit {

  modalPwaEvent: any;
  modalPwaPlatform: string | undefined;

  constructor(private platform: Platform) {

  }

  ngOnInit() {
    this.loadModalPwa();
  }

  public addToHomeScreen(): void {
    this.modalPwaEvent.prompt();
    this.modalPwaPlatform = undefined;
  }

  public closePwa(): void {
    this.modalPwaPlatform = undefined;
  }

  private loadModalPwa(): void {
    if (this.platform.ANDROID) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.modalPwaEvent = event;
        this.modalPwaPlatform = 'ANDROID';
      });
    }

    if (this.platform.IOS && this.platform.SAFARI) {
      const isInStandaloneMode = ('standalone' in window.navigator) && ((<any> window.navigator)['standalone']);
      if (!isInStandaloneMode) {
        this.modalPwaPlatform = 'IOS';
      }
    }
  }
}
