import { ref } from "vue";
import { defineStore } from "pinia";

export const useGlobalStore = defineStore('globalData', () => {
  const mockSetting = ref({} as any);
  const assetsSetting = ref({list: {}, upload: {}, delete: {}, update: {}} as any);
  const setSetting = (setting: any) => {
    mockSetting.value = setting;
  };

  return {
    mockSetting,
    assetsSetting,
    setSetting,
  }
}, {persist: true,});