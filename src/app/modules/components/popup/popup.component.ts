import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  ngOnInit(): void {

  }

  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
  isClosed
  onClose() {
    this.isOpen = false;
    this.close.emit();
  }
  onConfirm() {
    this.isOpen = false;
    this.confirm.emit();
  }
}
