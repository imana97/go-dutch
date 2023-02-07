import { makeObservable, observable, action, runInAction } from 'mobx';
import Parse from 'parse';
import ParseMobx from 'parse-mobx';

export class UserStore {
  constructor() {
    makeObservable(this);
  }

  @observable email: string = '';
  @observable password: string = '';
  @observable confirmPassword: string = '';
  @observable name: string = '';
  @observable errorMessage: string = '';
  @observable loggedInUser: ParseMobx | null = null;
  @observable loading: boolean = false;
  @observable signUpValidated: boolean = false;

  @action
  setLoggedInUser(user: Parse.User<Parse.Attributes> | undefined) {
    if (user) {
      this.loggedInUser = new ParseMobx(user);
    } else {
      this.loggedInUser = null;
    }
  }

  @action
  clearError() {
    this.errorMessage = '';
  }

  @action
  setSignUpValidated(value: boolean) {
    this.signUpValidated = value;
  }

  @action
  clearSignUpForm() {
    this.email = '';
    this.password = '';
    this.name = '';
    this.confirmPassword = '';
  }

  @action
  setEmail(value: string) {
    this.email = value;
  }

  @action
  setPassword(value: string) {
    this.password = value;
  }

  @action
  setName(value: string) {
    this.name = value;
  }

  @action
  setConfirmPassword(value: string) {
    this.confirmPassword = value;
  }

  @action
  async signUp(name: string, email: string, password: string) {
    this.loading = true;

    const user = new Parse.User();
    user.set('username', email);
    user.set('password', password);
    user.set('email', email);
    user.set('name', name);

    try {
      const createdUser = await user.signUp();
      // Hooray! Let them use the app now.
      runInAction(() => {
        this.loading = false;
        this.loggedInUser = new ParseMobx(createdUser);
      });
      return createdUser;
    } catch (error: any) {
      // Show the error message somewhere and let the user try again.
      runInAction(() => {
        this.loading = false;
        this.errorMessage = error.message;
      });

      throw error;
    }
  }

  @action
  async login(email: string, password: string) {
    this.errorMessage = '';

    try {
      const user = await Parse.User.logIn(email, password);
      runInAction(() => {
        this.loggedInUser = new ParseMobx(user);
      });

      return user;

      // user is logged in
    } catch (error: any) {
      runInAction(() => {
        this.errorMessage = error.message;
      });

      throw error;
    }
  }
}
