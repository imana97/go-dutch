import {makeObservable, observable, action, runInAction} from "mobx";
import Parse from "parse";

export class UserStore {

  constructor() {
    makeObservable(this);
  }

  @observable email: string = '';
  @observable password: string = '';
  @observable errorMessage: string = "";
  @observable loading: boolean = false;


  @action
  setEmail(value: string) {
    this.email = value;
  }

  @action
  setPassword(value: string) {
    this.password = value;
  }

  @action
  async login(email: string, password: string) {

    this.errorMessage="";

    if (email.trim().length===0) {
      this.errorMessage="Please insert an email address";
      console.log(this.errorMessage);
      return false;
    }

    // todo: do the same with password

    try {
      const user = await Parse.User.logIn(email, password);
      // user is logged in
    } catch (error: any) {
      runInAction(() => {
        this.errorMessage = error.message;
      })
    }

  }


}
