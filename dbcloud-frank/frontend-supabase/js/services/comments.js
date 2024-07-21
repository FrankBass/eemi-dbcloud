import supabase from './supabase.js';

export default {
  async getAll(articleId) {
    const { data, error } = await supabase
      .from('comments')
      .select('*, users(pseudo)')
      .eq('article_id', articleId)
      .order('created_at', { ascending: true });
    if (error) throw new Error(error.message);
    return data;
  },

  async create(comment) {
    const { data, error } = await supabase
      .from('comments')
      .insert(comment)
      .single();
    if (error) throw new Error(error.message);
    return { data, error };
  },

  async update(commentId, updates) {
    const { data, error } = await supabase
      .from('comments')
      .update(updates)
      .eq('id', commentId)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async delete(commentId) {
    const { data, error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId)
      .single();
    if (error) throw new Error(error.message);
    return data;
  }
};
