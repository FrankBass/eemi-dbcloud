import supabase from './supabase.js';

export default {
  async getAll() {
    const { data, error } = await supabase
      .from('articles')
      .select('*, author:users(pseudo)')
      .eq('status', 'PUBLISHED');
    if (error) throw new Error(error.message);
    return data;
  },

  async get(articleId) {
    const { data, error } = await supabase
      .from('articles')
      .select('*, author:users(pseudo)')
      .eq('id', articleId)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async create(article) {
    const { data, error } = await supabase
      .from('articles')
      .insert(article)
      .single();
    if (error) {
      console.error('Error creating article:', error);
      throw new Error(error.message);
    }
    return data;
  },

  async update(articleId, updates) {
    const { data, error } = await supabase
      .from('articles')
      .update(updates)
      .eq('id', articleId)
      .single();
    if (error) {
      console.error('Error updating article:', error);
      throw new Error(error.message);
    }
    return data;
  },

  async delete(articleId) {
    const { data, error } = await supabase
      .from('articles')
      .delete()
      .eq('id', articleId)
      .single();
    if (error) {
      console.error('Error deleting article:', error);
      throw new Error(error.message);
    }
    return data;
  }
};
