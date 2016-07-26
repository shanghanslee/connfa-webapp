import {Component, OnInit} from "@angular/core";
import {FavoritesComponent} from "../events_partials/favorites.component";
import {ActivatedRoute, ROUTER_DIRECTIVES} from "@angular/router";
import {SocialeventsListComponent} from "./socialevents-list.component";
import {SocialeventService} from "../../services/socialevent.service";

declare var moment: any;

@Component({
    selector: 'event-details',
    templateUrl: 'app/views/events_partials/details.html',
    directives: [FavoritesComponent, SocialeventsListComponent, ROUTER_DIRECTIVES],
})

export class SocialeventDetailComponent implements OnInit{

    public event;

    constructor(private _socialeventService: SocialeventService, private _router: ActivatedRoute) {}

    ngOnInit():any {

        if (this._router.params) {
            this._router.params.subscribe(params => {
                this._socialeventService.getSocialevent(params['id']).then((event)=> {
                    this.event = this.transform(event);
                })

                this._socialeventService.socialeventsChanged$.subscribe((data) => {
                    this._socialeventService.getSocialevent(params['id']).then((event)=> {
                        this.event = this.transform(event);
                    })
                })
            })
        }
    }

    private transform(event) {
        var transformed = event;
        transformed.timeLabel = moment(event.fom).format('ddd, LT') + ' - ' + moment(event.to).format('ddd, LT');
        return transformed;
    }
}
