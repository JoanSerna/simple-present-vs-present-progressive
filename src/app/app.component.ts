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
  public correct: number;
  public inCorrect: number;
  private clickNext: boolean;
  constructor() {
    this.correct = 0;
    this.inCorrect = 0;
    this.width = 1150;
    this.questions = [{}];
    this.state = 'loser';
    this.animation = false;
    this.clickNext = false;
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
      },
      {
        question: 'He _______________ anything at the moment',
        answers: ['Is not doing', 'Not does', 'Is not do', 'Is doing not'],
        response: 'Is not doing'
      },
      {
        question:
          'They ___________ playing at the moment, but they often ________ in the park',
        answers: [
          "Are doesn't / playing",
          'Does not / plays',
          "Are doesn't / plays",
          'Are not / play'
        ],
        response: 'Are not / play'
      },
      {
        question:
          'Felipe __________ english once a week, but he ___________ basketball at the moment',
        answers: [
          'Is teaching / Is practice',
          'Teach / Is practice',
          'Teaches / Is practicing',
          'Teachs / Is practicing'
        ],
        response: 'Teaches / Is practicing'
      },
      {
        question: 'I ________ to music right now!',
        answers: ['Do listen', 'Am listening', 'Listens', 'Listening'],
        response: 'Am listening'
      },
      {
        question:
          'He ___________ for telephone, but he _______ for microphone at the moment',
        answers: [
          "Doesn't speak / Is speaking",
          'Do are speak / Are speaks',
          'Does speak / Is speaking',
          'Do not speaks / Is speaking'
        ],
        response: "Doesn't speak / Is speaking"
      },
      {
        question: '_____ the tiger run fast?',
        answers: ['Do', 'Does', 'Doing', "Doesn't"],
        response: 'Does'
      },
      {
        question: '______ Mrs. Brown cook lunch every day?',
        answers: ['Do', 'She is', 'Do are', 'Does'],
        response: 'Does'
      },
      {
        question: '___ she ______ with her boyfriend right now?',
        answers: [
          'Does / Dance',
          'Is / Dancing',
          'Is / Dances',
          'Do / Dancing'
        ],
        response: 'Is / Dancing'
      },
      {
        question: '____ I ______ a sandwich?',
        answers: ['Is / Eating', 'Am / Eat', 'Am / Eating', 'Am / Eats'],
        response: 'Am / Eating'
      },
      {
        question: '_____ the children ______ in the break time?',
        answers: ['Does / Playing', 'Do / Plays', 'Does / Playes', 'Do / Play'],
        response: 'Do / Play'
      },
      {
        question: 'What _____ Rick do after he ____ up?',
        answers: ['Do / gets', 'Do / get', 'Does / gets', 'Does / getting'],
        response: 'Does / gets'
      },
      {
        question: 'When _____ he _____ a shower?',
        answers: ['Do / take', 'Does / takes', 'Do / takes', 'Does / take'],
        response: 'Does / take'
      },
      {
        question: 'When ______ you ______ the dishes?',
        answers: [
          'Do / wash',
          'Does / washing',
          'Does / washes',
          'Do / washes'
        ],
        response: 'Do / wash'
      },
      {
        question: 'What ____ they _____ in the restaurant?',
        answers: ['Are / eats', 'Are / eat', 'Are / eates', 'Are / eating'],
        response: 'Are / eating'
      },
      {
        question: 'Why _____ we ______ in the Sena?',
        answers: [
          'Is / Studing',
          'Are / Studies',
          'Are / Studying',
          'Is / Study'
        ],
        response: 'Are / Studying'
      }
    ];
  }

  public response(
    target: string,
    response: string,
    button: HTMLButtonElement
  ): void {
    console.log(this.clickNext);

    if (target === response) {
      if (!this.clickNext) {
        this.fire.nativeElement.style.transform = `translate(${button
          .getBoundingClientRect()
          .left.toString()}px,${button
          .getBoundingClientRect()
          .top.toString()}px`;
        this.state = 'winer';
        this.animation = true;
        this.correct++;
        this.clickNext = true;
      }
    } else {
      if (!this.clickNext) {
        this.inCorrect++;
        button.textContent = '❌';
        this.clickNext = true;
      }
    }
  }
  public next() {
    this.fire.nativeElement.style.transform = `translate(0,0)`;
    this.card.nativeElement.style.marginLeft = -this.width + 'px';
    this.width = this.width + 1150;
    this.clickNext = false;
  }
}
