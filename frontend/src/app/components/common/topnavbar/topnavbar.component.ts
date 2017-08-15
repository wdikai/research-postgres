import { Component } from '@angular/core';
import { smoothlyMenu } from '../../../app.helpers';
import { Router } from '@angular/router';
import { SessionService } from '../../../services/session.service';
declare var jQuery: any;

@Component({
    selector: 'topnavbar',
    templateUrl: 'topnavbar.template.html'
})
export class TopnavbarComponent {

    constructor(private sessionService: SessionService,
        private router: Router) { }

    toggleNavigation(): void {
        jQuery("body").toggleClass("mini-navbar");
        smoothlyMenu();
    }

    logout() {
        this.sessionService
            .logout()
            .subscribe(() => this.router.navigate(['/login']));
    }

}
