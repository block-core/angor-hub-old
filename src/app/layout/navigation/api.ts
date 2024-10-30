import { AngorNavigationItem } from '@angor/components/navigation';
import { AngorMockApiService } from '@angor/lib/mock-api';
import { Injectable } from '@angular/core';
import {
    defaultNavigation,
    horizontalNavigation,
} from 'app/layout/navigation/data';
import { cloneDeep } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class NavigationApi {
    private readonly _defaultNavigation: AngorNavigationItem[] =
        defaultNavigation;
    private readonly _horizontalNavigation: AngorNavigationItem[] =
        horizontalNavigation;

    constructor(private _angorMockApiService: AngorMockApiService) {
        // Register Mock API handlers
        this.registerHandlers();
    }

    registerHandlers(): void {
        this._angorMockApiService.onGet('api/navigation').reply(() => {



            // Fill horizontal navigation children using the default navigation
            this._horizontalNavigation.forEach((horizontalNavItem) => {
                this._defaultNavigation.forEach((defaultNavItem) => {
                    if (defaultNavItem.id === horizontalNavItem.id) {
                        horizontalNavItem.children = cloneDeep(
                            defaultNavItem.children
                        );
                    }
                });
            });

            // Return the response
            return [
                200,
                {
                    default: cloneDeep(this._defaultNavigation),
                    horizontal: cloneDeep(this._horizontalNavigation),
                },
            ];
        });
    }
}
