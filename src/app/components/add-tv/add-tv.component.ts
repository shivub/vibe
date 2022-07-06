import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalTvService } from 'src/app/services/LocalTvService';

@Component({
  selector: 'app-add-tv',
  templateUrl: './add-tv.component.html',
  styleUrls: ['./add-tv.component.css']
})
export class AddTvComponent implements OnInit {
  public movieForm!: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private _movieService: LocalTvService
  ) { }

  ngOnInit(): void {
    this.movieForm = this._formBuilder.group({
      name: ['', Validators.required],
      language: ['', Validators.required],
      overview: ['', [Validators.required, Validators.minLength(100), Validators.maxLength(500)]],
      tagline: ['', [Validators.required, Validators.maxLength(50)]],
      seasonsNumber: ['', Validators.required],
      episodesNumber: ['', Validators.required]
    })
  }

  public onSubmit(form: FormGroup){
    if(form.invalid)
      return;
    this._movieService.saveTvShow(form.value);
  }

}
