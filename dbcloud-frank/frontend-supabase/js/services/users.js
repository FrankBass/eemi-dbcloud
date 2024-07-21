import supabase from './supabase.js';

export default {
  async login(credentials) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password
    });
    if (error) {
      console.error('Login error:', error);
      throw new Error(error.message);
    }
    return data.session;
  },

  async signup(userData) {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          firstname: userData.firstname,
          lastname: userData.lastname,
          pseudo: userData.pseudo
        }
      }
    });
    if (error) {
      console.error('Signup error:', error);
      throw new Error(error.message);
    }
    return data.user;
  },

  async getProfile() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error(error);
      throw new Error(error.message);
    }
    return user;
  }
};
