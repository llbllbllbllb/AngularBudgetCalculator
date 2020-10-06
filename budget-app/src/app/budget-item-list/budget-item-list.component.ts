import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BudgetItem } from 'src/shared/models/budget-item-model';
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component';

@Component({
  selector: 'app-budget-item-list',
  templateUrl: './budget-item-list.component.html',
  styleUrls: ['./budget-item-list.component.scss']
})
export class BudgetItemListComponent implements OnInit {

  @Input() budgetItems: BudgetItem[];
  @Output() delete: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();
  @Output() diff: EventEmitter<Number> = new EventEmitter<Number>();
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onDeleteButtonClick(item: BudgetItem) {
    this.delete.emit(item);
  }

  onCardClicked(item:BudgetItem) {
    //show edit modal
    const dialogRef = this.dialog.open(EditItemModalComponent,{
      width: '580px',
      data: item
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        // result is updated budget item
        // replace item with updated item from the form
        let index = this.budgetItems.indexOf(item);
        this.diff.emit(result.amount - Number(this.budgetItems[index].amount));
        this.budgetItems[index] = result;
      
      }
    })
  }

}
