import { configureStore, DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';

import { loginReducer } from 'features/AuthByUsername';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: DeepPartial<StateSchema>) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        counter: counterReducer,
        user: userReducer,
        loginForm: loginReducer,
    };

    return configureStore<StateSchema>({
        reducer: rootReducers,
        devTools: typeof __IS_DEV__ !== 'undefined' ? __IS_DEV__ : true,
        preloadedState: initialState as StateSchema,
    });
}
