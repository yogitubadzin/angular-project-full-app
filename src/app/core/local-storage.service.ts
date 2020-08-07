import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getDataItem(dataItem: string) {
    const retrievedDataItem = localStorage.getItem(dataItem);
    if (retrievedDataItem == null) {
      return null;
    }
    return JSON.parse(retrievedDataItem);
  }

  removeDataItem(dataItem: string) {
    localStorage.removeItem(dataItem);
  }

  setDataItem(dataItem: string, dataItemsMap: Map<string, any>) {
    const dataToSave = JSON.stringify(Array.from(dataItemsMap.entries()));
    localStorage.setItem(dataItem, dataToSave);
  }

  getDataItemMap(dataItem: string) {
    const retrievedDataMap = localStorage.getItem(dataItem);
    let dataMap: Map<string, any>;
    if (retrievedDataMap != null) {
      dataMap = new Map(JSON.parse(retrievedDataMap));
    } else {
      dataMap = new Map();
    }

    return dataMap;
  }
}
