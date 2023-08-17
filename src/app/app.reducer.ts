import { ActionReducerMap } from '@ngrx/store';
import * as authReducer from './auth/store/auth.reducer';
import * as uiReducer from './shared/ui.reducer';
import * as ingresoEgreso from './ingreso-egreso/store/ingreso-egreso.reducer';

/**
 * codigo para poder implementar el Appstate global de la aplicación
 * desde acá llamo todos los reducer de mi aplicación desde los otros reducer importados
 * manejandolos de una forma centralizada e independiente del crecimiento que tengan
 */

export interface AppState {
    ui: uiReducer.State,
    auth: authReducer.State,
    ingresoEgreso: ingresoEgreso.State
}

export const appReducer: ActionReducerMap<AppState> = {
    ui: uiReducer.uiReducer,
    auth: authReducer.authReducer,
    ingresoEgreso: ingresoEgreso.ieReducer,
}
