import { Preferences } from '@capacitor/preferences';

export const set = async (key:any, value:any) => {
    const data = JSON.stringify(value);
    console.log("User Data", data)
  await Preferences.set({
    key: key,
    value: data,
  });
};

export const check = async (key:any) => {
  const { value } = await Preferences.get({ key: key });
  return value
};

export const remove = async (key:any) => {
  await Preferences.remove({ key: key });
};