import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  animate,
  style,
  state,
  transition,
  trigger
} from '@angular/animations';

@Component({
  selector: 'denario-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('cardAnimation', [
      state(
        'loser',
        style({
          transform: 'translateX(0px)'
        })
      ),
      state(
        'winer',
        style({
          transform: 'translateX(50px)'
        })
      ),
      transition('1 <=> 2', animate('250ms ease-in'))
    ])
  ]
})
export class AppComponent implements OnInit {
  @ViewChild('fire', { read: ElementRef })
  fire: ElementRef;
  @ViewChild('card', { read: ElementRef })
  card: ElementRef;
  public questions: object;
  public state: string;
  public animation: boolean;
  private width: number;
  constructor() {
    this.width = 1150;
    this.questions = [{}];
    this.state = 'loser';
    this.animation = false;
  }

  ngOnInit() {
    this.questions = [
      {
        question:
          'She __________ football every weekend, but today she __________ soccer',
        answers: [
          'Is watch/ Is plays',
          'Are watchs / Are plays',
          'Watches / Is playing',
          'Is watching / Is playes'
        ],
        response: 'Watches / Is playing'
      },
      {
        question: 'You __________ a book at the moment',
        answers: ['Are read', 'Are reading', 'Are reads', 'is read'],
        response: 'Are reading'
      },
      {
        question: 'I am ________ a haircut at the moment',
        answers: ['Gets', 'Getting', 'Geting', 'Get'],
        response: 'Getting'
      },
      {
        question:
          'Every day his grandfather______ for a walk, but today he __________ a book.',
        answers: [
          'Goes/Is reads',
          'Goes/Is reading',
          'Go/ Are read',
          'Goes/Is reades'
        ],
        response: 'Goes/Is reading'
      },
      {
        question:
          'She _______________ a cake at the moment, but she usually ______ pasta',
        answers: [
          'Is making/cooks',
          'Makes/cooks',
          'Is make/is cooking',
          'Is makes/is cooks'
        ],
        response: 'Is making/cooks'
      }
    ];
  }

  public response(
    target: string,
    response: string,
    button: HTMLButtonElement
  ): void {
    if (target === response) {
      this.fire.nativeElement.style.transform = `translate(${button
        .getBoundingClientRect()
        .left.toString()}px,${button.getBoundingClientRect().top.toString()}px`;
      this.state = 'winer';
      this.animation = true;
    } else {
      button.textContent = '❌';
    }
  }
  public next() {
    this.fire.nativeElement.style.transform = `translate(0,0)`;
    // this.card.nativeElement.style.transform = 'translateX(-1150px)';
    this.card.nativeElement.style.marginLeft = -this.width + 'px';
    this.width = this.width + 1150;
  }
}
