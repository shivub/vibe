import { SocialAuthService } from '@abacritt/angularx-social-login';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from 'src/app/services/SearchService';
import { ShowService } from 'src/app/services/ShowService';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public languageOptions = ['en', 'de'];
  public activeLanguage = this.languageOptions[0];
  public activeRoute = 'home';
  public isSearchActive: boolean = false;
  public photoUrl!: string;
  public langEmitter: EventEmitter<number> = new EventEmitter<number>();
  public accountEmitter: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  public searchEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _category!: string;
  constructor(
    private _route: ActivatedRoute, 
    private _cd: ChangeDetectorRef, 
    private _showService: ShowService,
    private _searchService: SearchService,
    private _authService: SocialAuthService,
    private _router: Router
    ) { }

  ngOnInit(): void {
    this._route.queryParams.subscribe(params => {
      this._category = params['category'];
      this._showService.emitBrowseType(this._category??'home');
    });

    this._authService.authState.subscribe((user) => {
      this.photoUrl = user.photoUrl;
    })
  }
  public search(searchText: string){
    this.searchEmitter.emit(this.isSearchActive);
    this._searchService.emitSearchEmitter(searchText);
  }

  public onLanguageChange(index: number) {
    this.activeLanguage = this.languageOptions[index];
    this.langEmitter.emit(index);
  }

  public onAccoutClick(){
    this.accountEmitter.emit();
  }

  public changeActiveRoute(route: string){
    this.activeRoute = route;
    this._cd.detectChanges();
  }

  public changeActiveSerach(){
    this.isSearchActive = !this.isSearchActive;
    if(!this.isSearchActive)
      this.search('');
  }

  public addMovie(){
    this._router.navigateByUrl('/add-movie');
  }

  public addTvShow(){
    this._router.navigateByUrl('/add-tv');
  }
}
