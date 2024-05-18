// testデータをpushする用の関数
function testDataPush() {
  const data = getFormData();
  appState.setState(data);
	const info = makeTournament();
	appState.setState({
		tournament: info.tournament,
		matches: info.matches,
		participants: info.participants,
	});
  const state = appState.getState();
  console.log(state);
  // テストデータをdjangoに送信し，djangoからの返り値をコンソールに表示する
  // djangoのurlをここで指定する
  fetch("/game/save_test/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(state),
  })
    .then((response) => response.json())
    .then((responseData) => {
      console.log("Success! From Django:", responseData);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
