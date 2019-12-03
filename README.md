# Система сбора данных на основе node.js
***
##### Для работы необходимо установить
* node.js
* mysql
***
### Для запуска необходимо перейти в деректорию с проектом и выполнить следующие команды:
```
npm install express --save
npm install mysql
```
***
### Сервер заускается командой 
```
node server.js
```
***
### Для корректной работы данной команды необходимо запустить сервер mysql со следующими характеристиками:
```
database: 'das_bd',
host: "localhost",
user: "root",
password: "1234"
```
**Характеристики можно изменить отредактировав файл server.js**
***
#### Чтобы попасть на страницу сбора данных нужно ввети в адресной строку браузера

```
http://127.0.0.1/DAS
```
 Форму на данной странице можно редактировать изменяя файл config.json
 ***
## Посмотреть текущее состояние базы данных:

```
http://127.0.0.1/database
```
***
# Данный пример является демонстрационным и дословное его копирование крайне не рекомендуется
***
### Если у вас возникнут вопросы
##### ~~Задавайте их кому-нибудь другому~~
##### Помните что гораздо интерееснее разобраться со всем самому!
