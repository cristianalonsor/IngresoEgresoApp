import { createReducer, on } from '@ngrx/store';
import * as actions from './ingreso-egreso.actions';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';

export interface State {
  items: IngresoEgreso[]
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