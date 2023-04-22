import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Buffer } from 'buffer';
import * as I from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  key: string = `${Buffer.from('MmM1YWIyMzRhNzZhMTAwZDc3M2E5MDc5ZjVjZjAyOGU=', 'base64').toString()}`;
  baseURL: string = 'https://api.themoviedb.org/3';

  
  constructor(private http: HttpClient) { }

  getTVGenres(): Observable<I.SelectOption[]> {
    return this.http.get<I.TVShowGenres>(`${this.baseURL}/genre/tv/list?api_key=${this.key}`).pipe(
      map((res: I.TVShowGenres) => res.genres)
    )
  }

  getKeywords(query: string): Observable<I.SelectOption[]> {
    return this.http.get<I.GenericGetResponse>(`${this.baseURL}/search/keyword?api_key=${this.key}&query=${query}`)
      .pipe(
        map(res => res.results.slice(0, 14))
      )
  }

  getShowDetails(tvID: number): Observable<I.ShowDetails> {
    return this.http.get<I.ShowDetails>(`${this.baseURL}/tv/${tvID}?api_key=${this.key}&append_to_response=keywords`)
  }


  searchTvShows(searchParams: I.SearchInput): Observable<I.DiscoverTvResponse> {
    let url = `${this.baseURL}/discover/tv?api_key=${this.key}`;

    /// Mandatory values
    // status
    url += `&with_status=${searchParams.status}`;
    // min & max year
    url += `&first_air_date.gte=${searchParams.yearMin}-01-01&first_air_date.lte=${searchParams.yearMax}-12-31`;
    // min rating
    url += `&vote_average.gte=${searchParams.ratingMin}`;


    /// Optional values
    if (searchParams.genres.length > 0) {
      const genres = searchParams.genres.join(`${searchParams.andorgenres}`);
      url += `&with_genres=${genres}`;
    }
    if (searchParams.keywords.length > 0) {
      const keywords = searchParams.keywords.join(`${searchParams.andorkeywords}`);
      url += `&with_keywords=${keywords}`;
    }


    return this.http.get<I.DiscoverTvResponse>(url);


  }

}
