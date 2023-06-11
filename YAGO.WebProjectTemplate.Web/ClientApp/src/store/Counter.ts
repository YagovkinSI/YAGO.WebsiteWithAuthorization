import { Action, Reducer } from 'redux';

// -----------------
// Состояние (state) - определяет тип данных, хранящихся в хранилище (store) Redux.

export interface CounterState {
    count: number;
}

// -----------------
// Действия (actions) - Это сериализуемые (следовательно, воспроизводимые) описания переходов состояний.
// Сами по себе они не имеют побочных эффектов; они просто описывают то, что должно произойти.
// Используйте @typeName и isActionType для определения типа, которое работает даже после сериализации/десериализации.

export interface IncrementCountAction { type: 'INCREMENT_COUNT' }
export interface DecrementCountAction { type: 'DECREMENT_COUNT' }

// Объявите тип 'размеченный союз' ('discriminated union'). Это гарантирует, что все ссылки на свойства типа ('type') 
// содержат одну из объявленных строк типа (а не любую другую произвольную строку).
export type KnownAction = IncrementCountAction | DecrementCountAction;

// ----------------
// Создатели действий (action creators) - это функции, открытые для компонентов UI (UI components), 
// которые вызывают переход состояния (state). Они не изменяют состояние (state) напрямую, 
// но могут иметь внешние побочные эффекты (такие как загрузка данных).

export const actionCreators = {
    increment: () => ({ type: 'INCREMENT_COUNT' } as IncrementCountAction),
    decrement: () => ({ type: 'DECREMENT_COUNT' } as DecrementCountAction)
};

// ----------------
// Редюсер (reducer) - для заданного состояния (state) и действия (action) возвращает новое состояние (state).
// Чтобы поддерживать путешествия во времени, это не должно мутировать старое состояние (state).

export const reducer: Reducer<CounterState> = (state: CounterState | undefined, incomingAction: Action): CounterState => {
    if (state === undefined) {
        return { count: 0 };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'INCREMENT_COUNT':
            return { count: state.count + 1 };
        case 'DECREMENT_COUNT':
            return { count: state.count - 1 };
        default:
            return state;
    }
};
