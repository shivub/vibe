import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import cloneDeep from 'clone-deep';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  @ViewChild('outlet', { read: ViewContainerRef })
  private _containerRef!: ViewContainerRef;

  @ViewChild('content', {read: TemplateRef})
  private _templateRef!: TemplateRef<any>;

  private _bannerStyle = 'linear-gradient(to right, rgba(3,37,65, 0.9) 0%, rgba(3,37,65, 0.2) 100%)';
  private _movieUrl = [
    'url("https://www.bollywoodhungama.com/wp-content/uploads/2021/07/K.G.F-%E2%80%93-Chapter-2-1.jpg")',
    'url("https://i.ytimg.com/vi/bweRG6WueuM/maxresdefault.jpg")',
    'url("https://www.posterposse.com/wp-content/uploads/2017/06/wonder-woman-banner.jpeg")',
    'url("https://i.pinimg.com/originals/67/f0/4b/67f04b50130b6fcfc7159d8852beaf98.jpg")'
  ];
  private _slideIndex = 0;
  

  public bannerStyle: any;

  constructor(private authService: SocialAuthService) { }

  ngOnInit(): void {
    this.bannerStyle = {
      background: this._bannerStyle + ', ' + this._movieUrl[this._slideIndex],
      minHeight: '300px',
      height: 'calc(100vh / 0.5)',
      maxHeight: '600px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'top center',
      backgroundSize: 'cover',
      color: '#fff',
    }
    
    this.authService.authState.subscribe(val => {
      console.log(val);
    })
  }

  public goToPrevSlide()
  {
    if( this._slideIndex === 0 ) return;
    this._containerRef.clear();
    const styleState = cloneDeep(this.bannerStyle);
    this.bannerStyle = {...styleState, background: this._bannerStyle + ', ' + this._movieUrl[--this._slideIndex]};
    this._containerRef.createEmbeddedView(this._templateRef);
  }

  public goToNextSlide()
  {
    if( this._slideIndex === this._movieUrl.length-1 ) return;
    this._containerRef.clear();
    const styleState = cloneDeep(this.bannerStyle);
    this.bannerStyle = {...styleState, background: this._bannerStyle + ', ' + this._movieUrl[++this._slideIndex]};
    this._containerRef.createEmbeddedView(this._templateRef);
  }

  public signInWithGoogle(){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
