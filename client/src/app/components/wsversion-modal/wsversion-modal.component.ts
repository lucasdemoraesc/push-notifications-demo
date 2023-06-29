import { Component, OnInit } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-wsversion-modal',
  templateUrl: './wsversion-modal.component.html',
  styleUrls: ['./wsversion-modal.component.scss']
})
export class WsversionModalComponent implements OnInit {

  modalVersion: boolean = false;

  constructor(private swUpdate: SwUpdate) {

  }

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.pipe(
        filter((event: any): event is VersionReadyEvent => event.type === 'VERSION_READY'),
        map((event: any) => {
          console.info(`Current version: ${event.currentVersion} | Latest version: ${event.latestVersion}`);
          this.modalVersion = true;
        })
      );
    }

    this.swUpdate.checkForUpdate().then(result => this.modalVersion = result);
  }

  public updateVersion() {
    this.modalVersion = false;
    window.location.reload();
  }

  public closeVersion() {
    this.modalVersion = false;
  }
}
