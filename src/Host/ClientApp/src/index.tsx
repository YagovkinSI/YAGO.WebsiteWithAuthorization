import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { setupStore } from './store';

// Получает экземпляр хранилища (store) для всего приложения
const store = setupStore();

// Находим элемент 'root' и используем его при создании корня (root) 
// для отображения компонентов React внутри узла DOM браузера.
const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

registerServiceWorker();
