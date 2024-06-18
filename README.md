## Установка зависимостей
```bash
$ npm install
```

## Настройка .env
Создайте в корне проекта .env файл. В нем укажите параметры MONGODB_URI и PORT, отвечающие за подключение к MongoDB и порт приложения соответственно.
Пример содержания .env файла

```bash
MONGODB_URI="mongodb+srv://login:password@cluster0.h0oydl3.mongodb.net/test-task?retryWrites=true&w=majority&appName=Cluster0"
#OR
MONGODB_URI="mongodb://localhost/test-task"
PORT=3000
```
## Запуск приложения

```bash
$ npm run start

```

## Запуск тестирования
Скрипт сохранит 10 000 000 записей в MongoDB, после чего выполнит поиск документа по имени test сначала с индексом, затем без него
```bash
$ npm run start:test
```

## Описание API
Базовый URL:
```bash
$ http://127.0.0.1:3000/database
```
Эндпоинты:
  1)  URL: "/create-documents"
      Метод: POST
      Тело запроса: 
      ```json
      {
        "count": number
      }
      ```
      Пример запроса:
      ```bash
      $ curl -X POST http://127.0.0.1:3000/database/create-documents -H "Content-Type: application/json" -d '{"count": 10000000}'
      ```
      Ответ:
      ```json
      {
        "message": "10000000 documents created"
      }
      ```
      Описание: создает указанное количество документов частями по 10 000 документов за раз

  2)  URL: "/create-index"
      Метод: POST
      Тело запроса: 
      ```json
      {
        "field": string
      }
      ```
      Пример запроса:
      ```bash
      $ curl -X POST http://127.0.0.1:3000/database/create-index -H "Content-Type: application/json" -d '{"field": "name"}'
      ```
      Ответ:
      ```json
      {
        "message": "Index on name created"
      }
      ```
      Описание: Создает индекс на указанном поле коллекции

  3)  URL: "/remove-index"
      Метод: POST
      Тело запроса: 
      ```json
      {
        "field": string
      }
      ```
      Пример запроса:
      ```bash
      $ curl -X POST http://127.0.0.1:3000/database/remove-index -H "Content-Type: application/json" -d '{"field": "name"}'
      ```
      Ответ:
      ```json
      {
        "message": "Index on name removed"
      }
      ```
      Описание: Удаляет индекс на указанном поле коллекции

  4)  URL: "/search"
      Метод: GET
      Параметры запроса: 
        "name": Имя для поиска документов
      Пример запроса:
      ```bash
      $ curl -X GET "http://127.0.0.1:3000/database/search?name=q25meygk84"
      ```
      Ответ:
      ```json
      [
          {
              "_id": "66718c919a9f8e23c43731ea",
              "name": "q25meygk84",
              "__v": 0
          }
      ]
      ```
      Описание: Ищет документы по указанному имени