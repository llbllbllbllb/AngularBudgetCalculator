export class BudgetItem {
    
    description: string;
    amount: Number;

    constructor(description: string, amount: number) {
        this.description = description;
        this.amount = amount;
    }
}