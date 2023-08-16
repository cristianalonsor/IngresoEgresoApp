import { ActionReducerMap } from '@ngrx/store';
import * as authReducer from './auth/store/auth.reducer';
import * as uiReducer from './shared/ui.reducer';


export interface AppState {
    ui: uiReducer.State,
    auth: authReducer.State
}

export const appReducer: ActionReducerMap<AppState> = {
    ui: uiReducer.uiReducer,
    auth: authReducer.authReducer
}
