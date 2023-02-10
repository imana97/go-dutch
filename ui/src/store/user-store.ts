import { makeObservable, observable, action, runInAction } from 'mobx';
import Parse from 'parse';
import ParseMobx from 'parse-mobx';
import { appConfig } from '../config';

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

  private async fetchSplitwiseUser(token: string) {
    const response = await Parse.Cloud.run('sw-current-user', { token });
    return JSON.parse(response);
  }

  async loginWithSplitwise(token: string) {
    try {
      const swUser = await this.fetchSplitwiseUser(token);
      await Parse.User.logInWith('splitwise', {
        authData: {
          id: swUser.user.id,
          access_token: token,
        },
      });
      const user = Parse.User.current();
      if (user) {
        if (!user.get('email')) {
          // set other fields
          user.set('email', swUser.user.email);
          user.set('name', swUser.user.first_name || 'unknown');
          user.set('about', "Hi, I'm a new user...");
          await user.save();
          window.location.href = '/account';
        } else {
          window.location.href = '/';
        }
      } else {
        window.location.href =
          '/login?error=' + encodeURIComponent('User is not logged in.');
      }
    } catch (error: any) {
      window.location.href = '/login?error=' + error.message;
    }
  }

  async redirectToSplitwise() {
    window.location.href = `${
      appConfig.splitwise.host
    }/oauth/authorize?client_id=${
      appConfig.splitwise.clientId
    }&redirect_uri=${encodeURIComponent(
      appConfig.splitwise.redirectURI,
    )}&response_type=${appConfig.splitwise.responseType}&scope=${
      appConfig.splitwise.scope
    }$state=${appConfig.splitwise.state}`;
  }

  @action
  async resetPassword() {
    const email = prompt(
      'Enter your email to receive password reset instruction',
    );
    if (email) {
      try {
        await Parse.User.requestPasswordReset(email);
        alert('Please check your email for password reset instructions.');
      } catch (error) {
        alert('Error in sending password reset instruction to your email.');
      }
    }
  }

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
