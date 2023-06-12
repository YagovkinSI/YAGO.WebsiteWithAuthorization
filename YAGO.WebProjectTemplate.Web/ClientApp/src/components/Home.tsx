import * as React from 'react';
import { connect } from 'react-redux';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Привет, мир!</h1>
      <p>Добро пожаловать в ваше новое одностраничное приложение, созданное с помощью:</p>
      <ul>
        <li><a href='https://get.asp.net/' target='_blank'>ASP.NET Core</a> и <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx' target='_blank'>C#</a> для кроссплатформенного серверного кода</li>
        <li><a href='https://facebook.github.io/react/' target='_blank'>React</a> и <a href='https://redux.js.org/' target='_blank'>Redux</a> для клиентского кода</li>
        <li><a href='https://mui.com/' target='_blank'>Material UI</a> для макета и стиля</li>
      </ul>
      <p>Чтобы помочь вам начать работу, мы также создали:</p>
      <ul>
        <li><strong>Клиентская навигация</strong>. Например, нажмите <em>Счетчик</em>, а затем <em>Назад</em>, чтобы вернуться сюда.</li>
        <li><strong>Режим разработки интеграции с сервером</strong>. В режиме разработки сервер разработки из <code>create-react-app</code> работает в фоновом режиме автоматически, поэтому ресурсы на стороне клиента создаются динамически по запросу, а страница обновляется при изменении любого файла.</li>
        <li><strong>Эффективная сборка в режиме релиза</strong>. В режиме релиза, функции режима разработки отключены, и ваша конфигурация <code>dotnet publish</code> создает минимизированные, эффективно связанные файлы JavaScript.</li>
      </ul>
      <p>Подкаталог <code>ClientApp</code> - это стандартное приложение React, основанное на шаблоне <code>create-react-app</code>. Если вы откроете командную строку в этом каталоге, вы сможете запускать команды <code>npm</code>, такие как <code>npm test</code> или <code>npm install</code>.</p>
    </div>
  )
};

export default connect()(Home);
