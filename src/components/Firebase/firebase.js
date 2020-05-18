import firebaseConfig from "./config";

class Firebase {
  constructor(app) {
    if(!firebaseInstance) {
      app.initializeApp(firebaseConfig);

      this.auth = app.auth();
      this.db = app.firestore();
      this.functions = app.functions();
      this.storage = app.storage();
    }
  }

  getUserProfile({ userId, onSnapshot }){
    return this.db.collection('publicProfiles').where('userId', '==', userId).limit(1).onSnapshot(onSnapshot)
  }

  async createCook({cookName}){
    const createCookCallable = this.functions.httpsCallable('createCook');
    return createCookCallable({
      cookName
    });
  }

  async getCook(){
    return this.db.collection('cook').get();
  }

  async createRecipe({recipeName, cookId, recipeCover, link, summary}){
    const createRecipeCallable = this.functions.httpsCallable('createRecipe');
    return createRecipeCallable({
      recipeName,
      cookId,
      recipeCover,
      link,
      summary
    })
  }

  async register({email, password, username}) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    const createProfileCallable = this.functions.httpsCallable('createPublicProfile');
    return createProfileCallable({
      username
    })
  }

  async postComment({text, bookId}){
    const postCommentCallable = this.functions.httpsCallable('postComment');
    return postCommentCallable({
      text,
      bookId
    });
  }

  async postComment({text, recipeId}){
    const postCommentCallable = this.functions.httpsCallable('postComment');
    return postCommentCallable({
      text,
      recipeId
    });
  }

  subscribeToRecipeComments({ recipeId, onSnapshot }){
    const recipeRef = this.db.collection('recipes').doc(recipeId);
    return this.db.collection('comments').where('recipe', '==', recipeRef).orderBy('dateCreated', 'desc').onSnapshot(onSnapshot)
  }

  async login({email, password}) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.auth.signOut();
  }
}

let firebaseInstance;

function getFirebaseInstance(app) {
  if(!firebaseInstance && app){
    firebaseInstance = new Firebase(app);
    return firebaseInstance;
  }else if(firebaseInstance){
    return firebaseInstance
  }else{
    return null;
  }
}

export default getFirebaseInstance;
