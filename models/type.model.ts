export interface TypeModel {
  id?: number;
  enum: string;
  name: string;
  description?: string;
  tags: string[];
  active: boolean;
}

export enum TypeEnum {
  IN = 'in',
  OUT = 'out',
  LOAN_IN = 'loanIn',
  LOAN_OUT = 'loanOut',
  INVESTMENT_IN = 'investmentIn',
  INVESTMENT_OUT = 'investmentOut',
  SUBSCRIPTION_IN = 'subscriptionIn',
  SUBSCRIPTION_OUT = 'subscriptionOut',
}
