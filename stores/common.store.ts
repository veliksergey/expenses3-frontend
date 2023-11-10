import { defineStore } from 'pinia';

export interface CommonModel {
  id?: number;
  name: string;
  tags: string[];
}
type State = {
  list: CommonModel[];
  selected: CommonModel | null;
  displayEditDialog: boolean;
  isLoadingList: boolean;
  isLoadingOne: boolean;
  isSaving: boolean;
  isDeleting: boolean;
};

export const useCommonStore = defineStore('CommonStore', {
  state: (): State => {
    return {
      list: [],
      selected: null,
      isLoadingList: false,
      displayEditDialog: false,
      isLoadingOne: false,
      isSaving: false,
      isDeleting: false,
    };
  },

  actions: {
    async getList(modelName: string) {
        this.isLoadingList = true;
        const myApi = new useMyApi();
        const {data, error, pending}: any = await myApi.get(`common/${modelName}`);
        this.list = data.value || [];
        this.isLoadingList = false;
      },
      async getOne(modelName: string, id: number) {
        this.isLoadingOne = true;
        const myApi = new useMyApi();
        const {data, error, pending}: any = await myApi.get(`common/${modelName}/${id}`);
        this.selected = data.value || null;
        this.isLoadingOne = false;
      },
      async createOrUpdate(modelName: string, model: CommonModel) {
        const myApi = new useMyApi();
        this.isSaving = true;
        if (model.id && model.id > 0) {
          const {data}: any = await myApi.put(`common/${modelName}/${model.id}`, model);
        } else {
          const {data}: any = await myApi.post(`common/${modelName}`, model);
        }
        this.isSaving = false;
        this.selected = null;
        this.displayEditDialog = false;
        this.getList(modelName);
      },
      async delete(modelName: string, id: number) {
        const myApi = new useMyApi();
        this.isDeleting = true;
        const {data}: any = await myApi.delete(`common/${modelName}`, {id});
        this.isDeleting = false;
        this.selected = null;
        this.getList(modelName);
      }
  },
});
