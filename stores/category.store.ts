import {defineStore} from 'pinia';

export interface Category {
  id?: number;
  name: string;
  tags: string[],
}
type State = {
  categories: Category[],
  selectedCategory: Category | null,
  displayEditDialog: boolean,
  isLoadingList: boolean,
  isLoadingOne: boolean,
  isSaving: boolean;
  isDeleting: boolean;
}

export const useCategoryStore = defineStore('CategoryStore', {
  
  state: (): State => {
    return {
      categories: [],
      selectedCategory: null,
      displayEditDialog: false,
      isLoadingList: false,
      isLoadingOne: false,
      isSaving: false,
      isDeleting: false,
    }
  },

  actions: {
    async getList(fromApi: boolean) {
      const myApi = new useMyApi();
      this.isLoadingList = true;
      if (fromApi || !this.categories.length) {
        const {data, error, pending}: any = await myApi.get('categories');
        this.categories = data.value || [];
      }
      this.isLoadingList = false;
    },
    async getOne(id: number, fromApi: boolean) {
      const myApi = new useMyApi();
      this.isLoadingOne = true;
      if (!fromApi && this.categories.length) {
        const foundCategory: Category | undefined = this.categories.find(c => c.id === id);
        if (foundCategory) {
          this.selectedCategory = foundCategory;
          this.isLoadingOne = false;
          return;
        }
      }
      const {data, error, pending}: any = await myApi.get(`categories/${id}`);
      this.selectedCategory = data.value || null;
      this.isLoadingOne = false;
    },
    async createOrUpdate(category: Category) {
      const myApi = new useMyApi();
      this.isSaving = true;
      if (category.id && category.id > 0) {
        const {data}: any = await myApi.put(`categories/${category.id}`, category);
      } else {
        const {data}: any = await myApi.post(`categories`, category);
      }
      this.isSaving = false;
      this.selectedCategory = null;
      this.displayEditDialog = false;
      this.getList(true);
    },
    async delete(id: number) {
      const myApi = new useMyApi();
      this.isDeleting = true;
      const {data}: any = await myApi.delete('categories', {id});
      this.isDeleting = false;
      this.selectedCategory = null;
      this.getList(true);
    }
  },

  getters: {
    categoriesCount({categories}): number {
      return categories.length;
    },
    getCategoryById({categories}): (id: number) => Category | null {
      return (id: number): Category | null => {
        return categories.find((category) => category.id === id) || null;
      }
    },
  }
  
});