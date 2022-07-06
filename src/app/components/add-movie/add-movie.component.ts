import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalMovieService } from 'src/app/services/LocalMovieService';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  public movieForm!: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private _movieService: LocalMovieService
  ) { }

  ngOnInit(): void {
    this.movieForm = this._formBuilder.group({
      title: ['', Validators.required],
      language: ['', Validators.required],
      overview: ['', [Validators.required, Validators.minLength(100), Validators.maxLength(500)]],
      tagline: ['', [Validators.required, Validators.maxLength(50)]],
      adult: ['', Validators.required],
      releaseDate: ['', Validators.required],
      runtime: ['', [Validators.required, Validators.max(240)]]
    })
  }

  public onSubmit(form: FormGroup){
    debugger
    if(form.invalid)
      return;
    this._movieService.saveMovie(form.value);
  }

}
