import {DataItemResType, DataListResType} from "config/types.ts";

const mockData = {
  "request_id": 4,
  "data": [
    {
      "id": 1,
      "img": "/Heart_of_a_dog.jpg",
      "title": "Собачье сердце",
      "file": "/Heart_of_a_dog.txt",
      "is_encrypted": 2,
      "is_deleted": false,
      "data_type": 1
    },
    {
      "id": 2,
      "img": "/Master.jpg",
      "title": "Мастер и Маргарита",
      "file": "/Master.txt",
      "is_encrypted": 2,
      "is_deleted": false,
      "data_type": 1
    },
    {
      "id": 3,
      "img": "/Code.png",
      "title": "Задача Tinkoff Start",
      "file": "/Tinkoff_task.txt",
      "is_encrypted": 2,
      "is_deleted": false,
      "data_type": 1
    },
    {
      "id": 5,
      "img": "/Car.jpg",
      "title": "Автомобильная выставка",
      "file": '',
      "is_encrypted": 1,
      "is_deleted": false,
      "data_type": 3
    },
    {
      "id": 7,
      "img": "/Code.png",
      "title": "Код компонента Icon",
      "file": "/Icon.tsx",
      "is_encrypted": 2,
      "is_deleted": false,
      "data_type": 2
    }
  ]
}


export const getMockDataList = () : DataListResType => {
  return mockData;
}

export const getMockDataItem = (id: number) : DataItemResType => {
  return mockData.data.filter(item => item.id === id)[0];
}