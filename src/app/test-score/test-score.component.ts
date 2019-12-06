import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

interface ITests {
  id: number;
  testName: string;
  pointsPossible: number;
  pointsReceived: number;
  percentage: number;
  grade: string;
}

@Component({
  selector: 'app-test-score',
  templateUrl: './test-score.component.html',
  styleUrls: ['./test-score.component.css']
})
export class TestScoreComponent implements OnInit {

  tests: Array<ITests> = [];
  name: string = '';
  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    this.tests = await this.loadTests();

  }

  async loadTests() {
    const tests1 = JSON.parse(localStorage.getItem('tests'));
    if (tests1 && tests1.length > 0) {
      this.tests = tests1;
      console.log('loadTests: >= 1');
    } else {
      this.tests = await this.loadTestsFromJson();
      console.log('loadTests: < 1');
    }

    return this.tests;
  }

  async loadTestsFromJson() {
    const tests2 = await this.http.get('assets/tests.json').toPromise();
    console.log('on init', tests2.json());
    return tests2.json();
  }


  addTest() {
    const test: ITests = {
      id: null,
      testName: null,
      pointsPossible: null,
      pointsReceived: null,
      percentage: null,
      grade: null
    };
    this.tests.unshift(test);
    this.saveToLocalStorage();
  }

  deleteTest(i: number) {
    this.tests.splice(i, 1);
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('tests', JSON.stringify(this.tests));
  }

  computeGrade() {
    console.log(this.name.indexOf(','));
    console.log('name', this.name);
    if (this.name.indexOf(',') < 0) {
      this.toastService.showToast('warning', 2000, 'name must have a comma!');
    } else {
      console.log('success');
      const data = this.computer();
      this.router.navigate(['home', data]);
    }
  }

  computer() {
    let tpp = 0;
    let tpr = 0;
    for (let i = 0; i < this.tests.length; i++) {
      tpp += this.tests[i].pointsPossible;
      tpr += this.tests[i].pointsReceived;
    }
    console.log(tpp);
    console.log(tpr);
    return {
      name: this.name,
      totalPointsPossible: tpp,
      totalPointsReceived: tpr,
      totalPercentage: tpr / tpp,
      finalGrade: 'changeme'
    };
  }
}
