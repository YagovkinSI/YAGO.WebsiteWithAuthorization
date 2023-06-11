// В продакшене (production) мы регистрируем сервис-воркера (service worker) 
// для обслуживания ассетов (assets) из локального кеша (local cache)

// Это позволяет приложению загружаться быстрее при последующих посещениях 
// в продакшене (production) и дает ему возможность работать в автономном (offline) 
// режиме. Однако это также означает, что разработчики (и пользователи) будут видеть 
// развернутые обновления только при посещении страницы "N+1", поскольку ранее 
// кэшированные ресурсы обновляются в фоновом режиме.

// Чтобы узнать больше о преимуществах этой модели, прочитайте https://goo.gl/KwvDNy.
// Эта ссылка также содержит инструкции по отказу от такого поведения.

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    // [::1] это адрес локального хоста IPv6.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 считается локальным хостом для IPv4.
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export default function register() {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        // Конструктор URL доступен во всех браузерах, поддерживающих SW.
        const url = process.env.PUBLIC_URL as string;
        const publicUrl = new URL(url, window.location.toString());
        if (publicUrl.origin !== window.location.origin) {
            // Наш сервис-воркер (service worker) не будет работать, если PUBLIC_URL 
            // находится в другом источнике, отличном от того, на котором обслуживается 
            // наша страница. Это может произойти, если CDN используется для обслуживания 
            // ассетов (assets); см. https://github.com/facebookincubator/create-react-app/issues/2374 
            return;
        }

        window.addEventListener('load', () => {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

            if (isLocalhost) {
                // При работе на локальном хосте проверяет, существует сервис-воркер (service worker) или нет.
                checkValidServiceWorker(swUrl);
            } else {
                // При работе на не локальном хосте просто регистриует сервис-воркер (service worker)
                registerValidSW(swUrl);
            }
        });
    }
}

function registerValidSW(swUrl: string) {
    navigator.serviceWorker
        .register(swUrl)
        .then(registration => {
            registration.onupdatefound = () => {
                const installingWorker = registration.installing as ServiceWorker;
                installingWorker.onstatechange = () => {
                    if (installingWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller) {
                            // На этом этапе старый контент будет удален, а новый контент 
                            // будет добавлен в кеш. Это идеальное время, чтобы отобразить 
                            // сообщение "Новый контент доступен. Пожалуйста, обновите страницу"
                            // в вашем веб-приложении.
                            console.log('Новый контент доступен. Пожалуйста, обновите страницу.');
                        } else {
                            // На этом этапе все предварительно кэшировано. Это идеальное время, 
                            // чтобы отобразить сообщение «Контент кэширован для автономного 
                            // (offline) использования».
                            console.log('Контент кэширован для offline использования.');
                        }
                    }
                };
            };
        })
        .catch(error => {
            console.error('Ошибка при регистрации "service worker"):', error);
        });
}

function checkValidServiceWorker(swUrl: string) {
    // Проверяет, можно ли найти сервис-воркера (service worker). Если не удается - перезагружает страницу
    fetch(swUrl)
        .then(response => {
            // Убеждается, что сервис-воркер (service worker) существует и что мы действительно получаем JS-файл.
            const contentType = response.headers.get('content-type');
            if (response.status === 404 || (contentType && contentType.indexOf('javascript') === -1)) {
                // Cервис-воркер (service worker) не найден. Наверное другое приложение. Перезагружает страницу.
                navigator.serviceWorker.ready.then(registration => {
                    registration.unregister().then(() => {
                        window.location.reload();
                    });
                });
            } else {
                // Cервис-воркер (service worker) найден. Штатно продолжает работу
                registerValidSW(swUrl);
            }
        })
        .catch(() => {
            console.log('Интернет-соединение не найдено. Приложение работает в offline режиме.');
        });
}

export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            registration.unregister();
        });
    }
}
