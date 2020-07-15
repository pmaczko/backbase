export interface Transaction {
    amount: string;
    categoryCode: string;
    merchant: string;
    merchantLogo: string;
    transactionDate: number;
    transactionDateString?: string;
    transactionType: string;
}
