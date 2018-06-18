import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

interface StructQuestions {
  question: string;
  answers: string[];
  response: string;
}
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
  public questions: StructQuestions[];
  public state: string;
  public animation: boolean;
  public correct: number;
  public inCorrect: number;
  private width: number;
  private clickNext: boolean;
  public title: string;
  public marker: boolean;
  constructor() {
    this.title = '💥Present Simple vs Present Progressive💥';
    this.correct = 0;
    this.inCorrect = 0;
    this.width = 1130;
    this.questions = [];
    this.state = 'loser';
    this.animation = false;
    this.clickNext = false;
    this.marker = true;
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

  ngOnInit() {
    this.questions.sort((prev, next) => {
      return Math.random() - 0.5;
    });
    this.questions.map(question => {
      question.answers.sort((prev, next) => Math.random() - 0.5);
    });
  }

  public response(
    target: string,
    response: string,
    button: HTMLButtonElement
  ): void {
    if (target === response) {
      if (!this.clickNext) {
        this.marker = false;
        this.fire.nativeElement.style.transform = `translate(${button.getBoundingClientRect()
          .left -
          button.getBoundingClientRect().width / 2}px,${
          button.getBoundingClientRect().top
        }px`;
        console.log(button.getBoundingClientRect());

        this.state = 'winer';
        this.animation = true;
        this.correct++;
        this.clickNext = true;
      }
    } else {
      if (!this.clickNext) {
        this.marker = false;
        this.inCorrect++;
        button.textContent = '❌';
        this.clickNext = true;
      }
    }
  }
  public next() {
    this.marker = true;
    this.fire.nativeElement.style.transform = `translate(0,0)`;
    this.card.nativeElement.style.marginLeft = -this.width + 'px';
    this.width = this.width + 1140;
    this.clickNext = false;
  }
}
