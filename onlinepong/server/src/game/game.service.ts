import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { GameGateway } from './game.gateway';

const barCought = (ballY: number, barY: number, barWidth: number): boolean => {
  return barY - barWidth / 2 >= ballY && barY + barWidth / 2 <= ballY;
};

@Injectable()
export class GameService {
  constructor(private gameGateway: GameGateway) {}

  // private logger: Logger = new Logger('TimeService');

  @Interval(1000)
  sendGameProps() {
    console.log(`games = ${this.gameGateway.gameRooms.length}`);
    this.gameGateway.gameRooms.forEach((game) => {
      const now = Date.now();
      if (game.props.status === 'on') {
        if (game.lastRenderedAt && game.lastRenderedAt > 0) {
          const dt = now - game.lastRenderedAt;

          // Yの当たり判定
          game.props.ballY += game.props.ballSppedY * dt;
          if (game.props.ballY - game.props.ballRadius <= 0) {
            // 上の壁に当たっている場合
            game.props.ballSppedY = -game.props.ballSppedY;
            game.props.ballY = -game.props.ballY;
          } else if (game.props.ballY >= game.props.sizeY) {
            // 下の壁に当たっている場合
            game.props.ballSppedY = -game.props.ballSppedY;
            game.props.ballY = game.props.sizeY * 2 - game.props.ballY;
          }

          // Xの当たり判定
          game.props.ballX += game.props.ballSppedX * dt;
          if (game.props.ballX <= 0) {
            // 左の壁に当たっている場合
            if (
              !barCought(
                game.props.ballY,
                game.props.barLeftY,
                game.props.barWidth,
              )
            ) {
              // 左がキャッチできていない
              game.props.pointRight++;
              if (game.props.pointRight >= game.props.pointToWin) {
                game.props.status = 'over';
              } else {
                if (game.props.turn === 'left') {
                  game.props.status = 'right';
                  game.props.turn = 'right';
                } else {
                  game.props.status = 'left';
                  game.props.turn = 'left';
                }
              }
            } else {
              // キャッチできている
              game.props.ballSppedX = -game.props.ballSppedX;
              game.props.ballX = -game.props.ballX;
            }
          } else if (game.props.ballX >= game.props.sizeX) {
            // 右の壁に当たっている場合
            if (
              !barCought(
                game.props.ballY,
                game.props.barRightY,
                game.props.barWidth,
              )
            ) {
              // 右がキャッチできていない
              game.props.pointLeft++;
              if (game.props.pointLeft >= game.props.pointToWin) {
                game.props.status = 'over';
              } else {
                if (game.props.turn === 'left') {
                  game.props.status = 'right';
                  game.props.turn = 'right';
                } else {
                  game.props.status = 'left';
                  game.props.turn = 'left';
                }
              }
            } else {
              // キャッチできている
              game.props.ballSppedX = -game.props.ballSppedX;
              game.props.ballX = game.props.sizeX * 2 - game.props.ballX;
            }
          }
        }
      }
      game.lastRenderedAt = now;
      this.gameGateway.sendGameData(game);
    });
  }
}
