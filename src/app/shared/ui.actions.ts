import { createAction, createActionGroup } from '@ngrx/store';



export const isLoading   = createAction('[UIComponent] isLoading');
export const stopLoading = createAction('[UIComponent] stopLoading');

//Otra forma de crear actions
// export const algo = createActionGroup({
//     source: 'UIComponents',
//     events: {
//         'isLoading': props<{nombre: tipo}>();
//         'propiedad': emptyProps());
//     }

// })