import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentActive: number;
  limit: number;
  height1: number;
  height2: number;
  height3: number;
  height4: number;
  isScroll: boolean;
  contents = [
    {id: 0, name: 'GIỚI THIỆU', status: true},
    {id: 1, name: 'VỊ BÁNH', status: false},
    {id: 2, name: 'BỘ HỘP', status: false},
    {id: 3, name: 'CHÍNH SÁCH', status: false},
    {id: 4, name: 'ĐẶT HÀNG', status: false},
    {id: 5, name: 'LIÊN HỆ', status: false},
  ];
  constructor(public route: ActivatedRoute) { }
  ngOnInit() {
    this.currentActive = 0;
    this.limit = Math.max( document.body.scrollHeight, document.body.offsetHeight,
      document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
    this.height1 = document.getElementById('sec1').offsetHeight;
    this.height2 = document.getElementById('sec2').offsetHeight;
    this.height3 = document.getElementById('sec3').offsetHeight;
    this.height4 = document.getElementById('sec4').offsetHeight;
  }

  @HostListener('window:scroll', ['$event'])
  doSomething(event) {
    // console.debug("Scroll Event", document.body.scrollTop);
    // see András Szepesházi's comment below
    console.log('Scroll Event', window.pageYOffset);
    console.log(this.limit - window.innerHeight);
    console.log(this.height1);
    console.log(this.height2);
    console.log(this.height3);
    console.log(this.height4);
    if ( window.pageYOffset > 0 ) {
      this.isScroll = true;
    } else {
      this.isScroll = false;
    }
  }

  scrollToElement(element): void {
    element.scrollIntoView({behavior: 'smooth', inline: 'nearest'});
  }

  test2 (num) {
    console.log(num);
  }

  test(needActiveId) {
    console.log(this.route.component);
    this.contents[this.currentActive].status = false;
    this.contents[needActiveId].status = true;
    this.currentActive = needActiveId;
  }
}
