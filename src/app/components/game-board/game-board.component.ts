import { Component, OnInit } from '@angular/core';
import { GameService } from '../../service/gameService';
import { Game } from '../../models/game';
import { Card } from '../../models/card';  // Ensure the Card class is imported
import { AuthService } from "../../service/authService";
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
  standalone: true,
  imports: [NgForOf, NgIf, NgClass]
})
export class GameBoardComponent implements OnInit {
  game: Game | null = null;
  flippedCards: Card[] = [];
  selectedDifficulty = 'EASY';

  constructor(private gameService: GameService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getLoggedInUsername().subscribe(username => {
      this.startGame(this.selectedDifficulty, username);
    });
  }

  startGame(difficulty: string, username: string): void {
    this.gameService.startGame(difficulty, username).subscribe(game => {
      this.game = game;
      this.flippedCards = [];
    });
  }
  flipCard(card: Card): void {
    if (!card.isFlipped && this.flippedCards.length < 2) {
      card.isFlipped = true;
      this.flippedCards.push(card);

      if (this.flippedCards.length === 2) {
        const value1 = this.evaluateCardValue(this.flippedCards[0].value);
        const value2 = this.evaluateCardValue(this.flippedCards[1].value);

        if (value1 === value2) {
          this.flippedCards = [];
          this.checkIfGameFinished();
        } else {
          setTimeout(() => {
            this.flippedCards[0].isFlipped = false;
            this.flippedCards[1].isFlipped = false;
            this.flippedCards = [];
          }, 1000);
        }
      }
    }
  }

  evaluateCardValue(value: string): string | number {
    if (this.selectedDifficulty === 'EASY') {
      try {
        return eval(value);
      } catch (e) {
        return value;
      }
    } else {
      return value;
    }
  }


  checkIfGameFinished(): void {
    if (this.game?.cards.every(card => card.isFlipped)) {
      this.endGame();
    }
  }

  endGame(): void {
    if (this.game?.id) {
      this.gameService.endGame(this.game.id).subscribe(result => {
        console.log('Game ended and saved:', result);
      });
    }
  }

  changeDifficulty(difficulty: string): void {
    this.selectedDifficulty = difficulty;
    this.authService.getLoggedInUsername().subscribe(username => {
      this.startGame(difficulty, username);
    });
  }

}
