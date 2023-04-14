export const storage = {
  chatAppIsAuth: 'chatAppIsAuth',
  chatAppUserName: 'chatAppUserName',
  chatAppUserEmail: 'chatAppUserEmail',
  chatAppUserToken: 'chatAppUserToken'
};

export const localStorageGetItem = (storageItem: string) => {
  try {
    const response = localStorage.getItem(storageItem);
    if (response) {
      return JSON.parse(response);
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export const localStorageSetItem = (storageItem: string, value: unknown) => {
  try {
    localStorage.setItem(storageItem, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const localStorageRemoveItem = (storageItem: string) => {
  try {
    localStorage.removeItem(storageItem);
  } catch (error) {
    console.log(error);
  }
};
