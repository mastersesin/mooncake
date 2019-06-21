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
    {id: 0, name: 'GIỚI THIỆU', status: true, section: 'sec0'},
    {id: 1, name: 'VỊ BÁNH', status: false, section: 'sec1'},
    {id: 2, name: 'BỘ HỘP', status: false, section: 'sec2'},
    {id: 3, name: 'CHÍNH SÁCH', status: false, section: 'sec3'},
    {id: 4, name: 'ĐẶT HÀNG', status: false},
    {id: 5, name: 'LIÊN HỆ', status: false},
  ];
  slides = [
    {active: true, img: "https://giacongchuyennghiep.com/wp-content/uploads/2017/11/khuon-lam-banh-trung-thu-dia-chi-ban-khuon-lam-banh-trung-thu-bang-go-gia-re-1.jpg"},
    {active: false, img: "https://blog.beemart.vn/wp-content/uploads/2015/08/cach-bao-quan-banh-trung-thu-dung-nhat-chuan-nhat-3.jpg"},
    {active: false, img: "http://placehold.it/350x150/333333"},
    {active: false, img: "http://placehold.it/350x150/666666"}
  ];
  slideConfig = {slidesToScroll: 1, autoplay: true, autoplaySpeed: 1000};
  constructor(public route: ActivatedRoute) { }
  ngOnInit() {
    this.currentActive = 0;
    this.limit = Math.max( document.body.scrollHeight, document.body.offsetHeight,
      document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
    // this.height1 = document.getElementById('sec1').offsetHeight;
    // this.height2 = document.getElementById('sec2').offsetHeight;
    // this.height3 = document.getElementById('sec3').offsetHeight;
    // this.height4 = document.getElementById('sec4').offsetHeight;
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

  afterChange(e) {
    for (const key in this.slides) {
      if (this.slides[key].active === true) {
        this.slides[key].active = false;
      }
    }
    this.slides[e.currentSlide].active = true;
  }

  scrollToElement(element): void {
    console.log(element);
    var myElement = document.getElementById('sec0');
    console.log(myElement);
    myElement.scrollIntoView({behavior: 'smooth', inline: 'nearest'});
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
