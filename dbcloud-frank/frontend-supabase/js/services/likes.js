import supabase from './supabase.js';

export default {
  async getCount(articleId) {
    const { count, error } = await supabase
      .from('likes')
      .select('*', { count: 'exact' })
      .eq('article_id', articleId);
    if (error) throw new Error(error.message);
    return count;
  },

  async toggleLike(articleId, userId) {
    if (!userId) {
      throw new Error("User ID is undefined");
    }

    const { data: existingLike, error: existingLikeError } = await supabase
      .from('likes')
      .select('*')
      .eq('article_id', articleId)
      .eq('user_id', userId)
      .single();

    if (existingLikeError && existingLikeError.code !== 'PGRST116') {
      throw new Error(existingLikeError.message);
    }

    if (existingLike) {
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('id', existingLike.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabase
        .from('likes')
        .insert({ article_id: articleId, user_id: userId });
      if (error) throw new Error(error.message);
    }
  },

    async getUserLikes(userId) {
      const { data, error } = await supabase
        .from('likes')
        .select('articles(*)')
        .eq('user_id', userId);
  
      if (error) {
        console.error('Error fetching user likes:', error);
        throw error;
      }
      return data.map(like => like.articles);
    }
  };