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
    '40': [],
  };

  addPlayer(player: Player) {
    this.removePlayer(player.id);
    this.queues[player.queueType].push(player);
  }

  removePlayer(socketId: string) {
    let removed = false;
    for (const queueType of Object.keys(this.queues)) {
      const initialLength = this.queues[queueType].length;
      this.queues[queueType] = this.queues[queueType].filter(p => p.id !== socketId);
      if (this.queues[queueType].length < initialLength) {
        removed = true;
      }
    }
  }

  matchPlayers(): Match[] {
    const matches: Match[] = [];

    for (const type of ['10', '25', '40']) {
      const queue = this.queues[type];
      if (queue.length < 2) {
        continue;
      }

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
    const seconds = Math.floor(waitTimeMs / 1000);
    const tolerance = Math.min(100 + Math.floor(seconds / 5) * 10, 1000);
    return tolerance;
  }

  getQueueStatus() {
    const status: any = {};
    for (const [queueType, players] of Object.entries(this.queues)) {
      status[queueType] = {
        count: players.length,
        players: players.map(p => ({
          id: p.id.substring(0, 8) + '...',
          rating: p.rating,
          waitTime: Math.floor((Date.now() - p.joinTime) / 1000) + 's'
        }))
      };
    }
    return status;
  }
}