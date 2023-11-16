import {defineStore} from 'pinia';
import type { CommonModel } from './common.store';

type ProjectModel = {
    id: number;
    shortName?: string;
    name: string;
    description?: string;
}

export interface Record {
    id?: number;
    name: string;
    description?: string;
    amountPlanned?: number;
    amountActual?: number;
    amountRelated?: number;
    startDatePlanned?: Date;
    startDateActual?: Date;
    finishDatePlanned?: Date;
    finishDateActual?: Date;
    relatedDate?: Date;

    typeId?: number;
    type?: CommonModel;
    categoryId?: number;
    category?: CommonModel;
    accountId?: number;
    account?: CommonModel;
    vendorId?: number;
    vendor?: CommonModel;
    statusId?: number;
    status?: CommonModel;
    projectId?: number;
    project?: ProjectModel;
    userId?: number;
    user?: CommonModel;

    parentId?: number;
    parent?: Record;
    children?: Record[],
    parents?: string;
    childrenCount?: number;

    createdAt?: Date;
    updatedAt?: Date;
}

type State = {
    list: Record[];
    selected: Record | null;
    displayEditDialog: boolean;
    isLoadingList: boolean;
    isLoadingOne: boolean;
    isSaving: boolean;
    isDeleting: boolean;
}

export const useRecordStore = defineStore('RecordStore', {
    state: (): State => {
        return {
            list: [],
            selected: null,
            displayEditDialog: false,
            isLoadingList: false,
            isLoadingOne: false,
            isSaving: false,
            isDeleting: false,
        };
    },
    
    actions: {
        async getList() {
            const myApi = new useMyApi();
            this.isLoadingList = true;
            const {data, error, pending}: any = await myApi.get('records');
            this.list = data.value || [];
            this.isLoadingList = false;
        },
        async getOne(id: number) {
            const myApi = new useMyApi();
            this.isLoadingOne = true;
            const {data, error, pending}: any = await myApi.get(`records${id}`);
            this.selected = data.value || null;
            this.isLoadingOne = false;
        }
    }
});