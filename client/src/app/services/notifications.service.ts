import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SwPush } from "@angular/service-worker";
import { firstValueFrom } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  constructor(
    private http: HttpClient,
    private swPush: SwPush
  ) { }

  public async serverSubscribers() {
    const subscriptions = await firstValueFrom(this.http.get<any>(`${environment.apiUrl}/notification/push/subscribers`));
    return subscriptions;
  }

  public async serverPublicKey() {
    const data = await firstValueFrom(this.http.get<{ publicKey: string; }>(`${environment.apiUrl}/notification/push/publickey`));
    return data.publicKey;
  }

  public async subscribeToNotifications() {
    const subscription = await this.swPush.requestSubscription({
      serverPublicKey: await this.serverPublicKey()
    });

    return this.http.post<any>(`${environment.apiUrl}/notification/push/subscribe`, subscription);
  }
}
