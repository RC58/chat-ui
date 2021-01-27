import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent implements OnInit {
  @ViewChild('tabGroup', {static:false}) tabGroup;


  isChatActive: boolean = false;
  selectedIndex = 1;

  constructor() { }

  ngOnInit() {
  }

  toggleChat() {
    this.isChatActive = !this.isChatActive;
  }

  toggleActiveChat(index) {
    this.selectedIndex = index;
  }

  scrollTabs(event) {
    const children = this.tabGroup._tabHeader._elementRef.nativeElement.children;
  
    // get the tabGroup pagination buttons
    const back = children[0];
    const forward = children[2];
  
    // depending on scroll direction click forward or back
    if (event.deltaY > 0) {
      forward.click();
    } else {
      back.click();
    }
  }

}
