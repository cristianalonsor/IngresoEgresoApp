import { createReducer, on } from '@ngrx/store';
import * as actions from './ingreso-egreso.actions';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { AppState } from '../../app.reducer';

export interface State {
  items: IngresoEgreso[]
};

export interface AppStateIngreso extends AppState{
  ingresoEgreso: State
}

const initialState: State = {
  items: []
};


export const _ingresoReducer = createReducer(
  initialState,
  on(actions.setItems, (state, action) => ({ ...state, items: [...action.items] })),
  on(actions.unsetItems, (state) => ({ ...state, items: [] })),
)


export function ieReducer(state, action) {
  return _ingresoReducer(state, action)
}