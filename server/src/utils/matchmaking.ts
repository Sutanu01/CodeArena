export type Player = {
  id: string;
  rating: number;
  joinTime: number;
  queueType: '10' | '25' | '40';
};

export type Match = [Player, Player];

export class MatchMaker {
  queues: { [key: string]: Player[] } = {
    '10': [],
    '25': [],
    '40': []
  };

  addPlayer(player: Player) {
    this.queues[player.queueType].push(player);
  }

  matchPlayers(): Match[] {
    const matches: Match[] = [];

    for (const type of ['10', '25', '40']) {
      const queue = this.queues[type];
      queue.sort((a, b) => a.joinTime - b.joinTime);
      const matchedIndices = new Set<number>();

      for (let i = 0; i < queue.length; i++) {
        if (matchedIndices.has(i)) continue;

        const player1 = queue[i];
        let bestMatchIndex: number | null = null;
        let bestMatchScore = Infinity;

        for (let j = i + 1; j < queue.length; j++) {
          if (matchedIndices.has(j)) continue;

          const player2 = queue[j];
          const timeInQueue = Date.now() - Math.min(player1.joinTime, player2.joinTime);
          const ratingTolerance = this.getRatingTolerance(timeInQueue);

          const ratingDiff = Math.abs(player1.rating - player2.rating);

          if (ratingDiff <= ratingTolerance && ratingDiff < bestMatchScore) {
            bestMatchIndex = j;
            bestMatchScore = ratingDiff;
          }
        }
        if (bestMatchIndex !== null) {
          matches.push([player1, queue[bestMatchIndex]]);
          matchedIndices.add(i);
          matchedIndices.add(bestMatchIndex);
        }
      }
      this.queues[type] = queue.filter((_, index) => !matchedIndices.has(index));
    }
    return matches;
  }
  getRatingTolerance(waitTimeMs: number): number {
    const minutes = Math.floor(waitTimeMs / 60000);
    return Math.min(50 + minutes * 5, 200);
  }
}