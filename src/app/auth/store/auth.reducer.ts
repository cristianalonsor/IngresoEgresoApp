import { createReducer, on } from '@ngrx/store';
import { setUser, unsetUser } from './auth.actions';
import { Usuario } from '../../models/usuario.model';

export interface State {
    user: Usuario | null;
}

const initialState: State = {
    user: null,
};


export const _authReducer = createReducer(
    initialState,
    on(setUser, (state, { user }) => ({ ...state, user })),
    on(unsetUser, (state) => ({ ...state, user: null })),
)


export function authReducer(state, action) {
    return _authReducer(state, action)
}