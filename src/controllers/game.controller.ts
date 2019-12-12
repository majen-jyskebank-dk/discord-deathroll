import Game, { IGame } from '../model/game.model';

interface ICreateGame {
    betBy: IGame['betBy'];
    bet: IGame['bet'];
}

async function Create({ betBy, bet }: ICreateGame): Promise<IGame> {
    return await Game.create({
        betBy,
        previousRoll: bet,
        bet,
        updated: new Date().getTime(),
    });
}

export default {
    Create,
};
