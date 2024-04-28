// 配列をシャッフルする関数
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 各回線に何試合あるか計算する関数（シードや余りも１試合とカウントされる）　[1回戦の回数，2回戦の回数，3回戦の回数，...]
function calcRoundTime(participants_length) {
  let length = participants_length;
  const rounds = [];

  while (length > 1) {
    length = Math.ceil(length / 2);
    rounds.push(length);
  }
  return rounds;
}

function makeTournament() {
  const tournament = appState.getStateByKey("tournament");
  const participants = appState.getStateByKey("participants");

  // 出場者をランダムに並び替える
  const shuffledParticipants = shuffleArray(participants);

  // participantクラスの配列に変換
  const participantArray = shuffledParticipants.map((participant) => {
    return new Participant(participant.name);
  });
	// tournamentクラスのインスタンスを生成
	const tournamentInstance = new Tournament(tournament.name);
	const totalMatchNumber = participantArray.length - 1;

	console.log(tournamentInstance);
  console.log(participantArray);

  // 2か3の固まりになるまで割っていきグループにする
  // 決勝の試合から順に組み合わせを作る，左と右の試合を持つようにする Matchクラスのインスタンスを生成
	// 2か3の固まりになるまでは試合に出場者を登録しない
	for (let i = 0; i < participantArray.length; i++) {
		const match = new Match();


	}

  // 2の場合はそのまま，3の場合は1人を2人に分ける

  // 1回戦の組み合わせを作る

  // 2回戦以降の組み合わせを作る

  //

  // 参加者の長さからトーナメントのラウンド数を計算
  const rounds = calcRoundTime(participants.length);

  console.log(rounds);
}
