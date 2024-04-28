class AppStore {
  constructor(initialState = {}) {
    this.state = initialState;
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState,
    };
  }

  printState() {
    console.log(this.state);
  }

	getStateByKey(key) {
		return this.state[key];
	}
}


const appState = new AppStore();
