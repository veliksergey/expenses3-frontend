import {defineStore} from 'pinia';

type Category = {
  id: number;
  name: string;
}
type State = {
  categories: Category[],
}

export const useCategoryStore = defineStore('CategoryStore', {
  
  state: (): State => {
    return {
      categories: [],
    }
  },

  actions: {
    async getList(forced: boolean) {
      if (forced || !this.categories.length) {
        const {data, error, pending}: any = await useFetch('http://localhost:3003/categories');
        this.categories = data.value || [];
      }
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
    }
  }
  
});