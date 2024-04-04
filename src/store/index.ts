import { ref } from "vue";
import { defineStore } from "pinia";

export const useGlobalStore = defineStore('globalData', () => {
  const mockSetting = ref({} as any);
  const assetsSetting = ref({list: {}, upload: {}, delete: {}, update: {}} as any);
  const setSetting = (settingFor: string, setting: any) => {
    if(settingFor === 'mock') {
      mockSetting.value = setting;
    } else if(settingFor === 'assets') {
      assetsSetting.value = setting;
    }
  };

  return {
    mockSetting,
    assetsSetting,
    setSetting,
  }
}, {persist: true,});