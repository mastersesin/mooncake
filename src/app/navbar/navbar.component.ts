import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ElementRef, ViewChild } from '@angular/core';
import { ApicallService } from '../apicall.service';

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
  strartPointHeight1: number;
  strartPointHeight2: number;
  strartPointHeight3: number;
  strartPointHeight4: number;
  strartPointHeight5: number;
  isScroll: boolean;
  contents = [
    {id: 0, name: 'GIỚI THIỆU', status: true, section: 'sec1'},
    {id: 1, name: 'BỘ HỘP', status: false, section: 'sec2'},
    {id: 2, name: 'VỊ BÁNH', status: false, section: 'sec3'},
    {id: 3, name: 'CHÍNH SÁCH', status: false, section: 'sec4'},
    {id: 4, name: 'ĐẶT HÀNG', status: false, section: 'sec5'},
  ];
  slides = [
    {active: true, img: "../../assets/Slide1.jpg"},
    {active: false, img: "../../assets/Slide2.jpg"},
    {active: false, img: "../../assets/Slide3.jpg"},
    {active: false, img: "../../assets/Slide4.jpg"}
  ];
  slideConfig = {
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: false,
    nextArrow: false,
  };
  innerWidth: number;
  responsive: boolean;
  hoten: string;
  congty: string;
  email: string;
  dienthoai: string;
  diachinhanbanh: string;
  soluonghop: string;
  ngaycanbanh: string;
  ghichukhac: string;
  apiMsg: string;
  clicked: boolean;
  constructor(
    public route: ActivatedRoute,
    private apicall: ApicallService
    ) { }
  ngOnInit() {
    this.currentActive = 0;
    this.limit = Math.max( document.body.scrollHeight, document.body.offsetHeight,
      document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
    this.height1 = document.getElementById('sec1').offsetHeight + 540;
    this.height2 = document.getElementById('sec2').offsetHeight;
    this.height3 = document.getElementById('sec3').offsetHeight;
    this.height4 = document.getElementById('sec4').offsetHeight;
    this.height4 = document.getElementById('sec5').offsetHeight;
    this.strartPointHeight1 = 0;
    this.strartPointHeight2 = this.strartPointHeight1 + this.height1;
    this.strartPointHeight3 = this.strartPointHeight2 + this.height2 ;
    this.strartPointHeight4 = this.strartPointHeight3 + this.height3 ;
    this.strartPointHeight5 = this.strartPointHeight4 + this.height4 ;
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 600) {
      this.responsive = true;
    }
  }

  @HostListener('window:scroll', ['$event'])
  doSomething(event) {
    // console.debug("Scroll Event", document.body.scrollTop);
    // see András Szepesházi's comment below
    if ( window.pageYOffset > 0 ) {
      this.isScroll = true;
    } else {
      this.isScroll = false;
    }
    if ( window.pageYOffset < this.strartPointHeight2 ) {
      for (const key in this.contents) {
        if (this.contents[key].status === true) {
          this.contents[key].status = false;
      }
      this.contents[0].status = true;
      }
    } else if (window.pageYOffset >= this.strartPointHeight2 && window.pageYOffset < this.strartPointHeight3) {
      for (const key in this.contents) {
        if (this.contents[key].status === true) {
          this.contents[key].status = false;
      }
      this.contents[1].status = true;
      }
    } else if  ( window.pageYOffset >= this.strartPointHeight3 && window.pageYOffset < this.strartPointHeight4 ) {
      for (const key in this.contents) {
        if (this.contents[key].status === true) {
          this.contents[key].status = false;
      }
      this.contents[2].status = true;
      }
    } else if  ( window.pageYOffset >= this.strartPointHeight4 && window.pageYOffset < this.strartPointHeight5 ) {
      for (const key in this.contents) {
        if (this.contents[key].status === true) {
          this.contents[key].status = false;
      }
      this.contents[3].status = true;
      }
    } else {
      for (const key in this.contents) {
        if (this.contents[key].status === true) {
          this.contents[key].status = false;
      }
      this.contents[4].status = true;
      }
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
    var myElement = document.getElementById(element);
    myElement.scrollIntoView({behavior: 'smooth', inline: 'nearest'});
  }

  test2 (num) {
  }

  onSave(){
    this.clicked = true;
    this.apiMsg = '';
    this.apicall.postRegisterInfo(
      this.hoten,
      this.congty,
      this.email,
      this.dienthoai,
      this.diachinhanbanh,
      this.soluonghop,
      this.ngaycanbanh,
      this.ghichukhac
    ).subscribe(data => {
      setTimeout(() => { this.apiMsg = data.msg; }, 300);
      this.clicked = false;
    }
    );
  }

  test(needActiveId) {
  }
}
