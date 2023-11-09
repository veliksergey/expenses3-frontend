import {defineStore} from 'pinia';
const baseUrl = 'http://localhost:3003';

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
      this.isLoadingList = true;
      if (fromApi || !this.categories.length) {
        const {data, error, pending}: any = await useFetch(`${baseUrl}/categories`);
        this.categories = data.value || [];
      }
      this.isLoadingList = false;
    },
    async getOne(id: number, fromApi: boolean) {
      this.isLoadingOne = true;
      if (!fromApi && this.categories.length) {
        const foundCategory: Category | undefined = this.categories.find(c => c.id === id);
        if (foundCategory) {
          this.selectedCategory = foundCategory;
          this.isLoadingOne = false;
          return;
        }
      }
      const {data, error, pending}: any = await useFetch(`${baseUrl}/categories/${id}`);
      this.selectedCategory = data.value || null;
      this.isLoadingOne = false;
    },
    async createOrUpdate(category: Category) {
      this.isSaving = true;
      console.log('-- createOrUpdate:', category);
      if (category.id && category.id > 0) {
        const {data}: any = await useFetch(`${baseUrl}/categories/${category.id}`, {
          method: 'put',
          body: category,
        });
      } else {
        const {data}: any = await useFetch(`${baseUrl}/categories`, {
          method: 'post',
          body: category
        });
      }
      this.isSaving = false;
      this.selectedCategory = null;
      this.displayEditDialog = false;
      this.getList(true);
    },
    async delete(id: number) {
      this.isDeleting = true;
      const {data}: any = await useFetch(`${baseUrl}/categories`, {
        method: 'delete',
        body: {id},
      });
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