import { trigger, transition, style, animate } from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
    transition('mobHome <=> mobLogin', [
        style({ opacity: 0 }),
        animate('0.3s', style({ opacity: 1 })),
      ]),
      transition('mobLogin <=> mobHome', [
        style({ opacity: 0 }),
        animate('0.3s', style({ opacity: 1 })),
      ]),
      transition('mobHome <=> mobOrders', [
        style({ opacity: 0 }),
        animate('0.3s', style({ opacity: 1 })),
      ]),
      transition('mobHome <=> mobAddOrder', [
        style({ opacity: 0 }),
        animate('0.3s', style({ opacity: 1 })),
      ]),
      transition('mobLogin <=> mobOrders', [
        style({ opacity: 0 }),
        animate('0.3s', style({ opacity: 1 })),
      ]),
      transition('mobLogin <=> mobAddOrder', [
        style({ opacity: 0 }),
        animate('0.3s', style({ opacity: 1 })),
      ]),
      transition('mobOrders <=> mobAddOrder', [
        style({ opacity: 0 }),
        animate('0.3s', style({ opacity: 1 })),
      ]),
]);