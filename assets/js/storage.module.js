import { supabase } from './supabase.client'

const BUCKET_NAME = 'uploads'

export const StorageService = {
  async uploadFile(file, path) {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(path, file)
    
    if (error) throw new Error(`Erro no upload: ${error.message}`)
    
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(path)
    
    return publicUrl
  },

  async deleteFile(path) {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([path])
    
    if (error) throw new Error(`Erro ao deletar arquivo: ${error.message}`)
    return true
  }
}