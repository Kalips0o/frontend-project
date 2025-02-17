import { configureStore, DeepPartial } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: DeepPartial<StateSchema>) {
    return configureStore<StateSchema>({
        reducer: {
            counter: counterReducer,
        },
        devTools: typeof __IS_DEV__ !== 'undefined' ? __IS_DEV__ : true,
        preloadedState: initialState as StateSchema,
    });
}
