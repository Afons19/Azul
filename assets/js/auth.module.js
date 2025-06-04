import { supabase } from './supabase.client'

export const AuthService = {
  async login(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      return data
    } catch (error) {
      console.error('Erro no login:', error)
      throw error
    }
  },

  async logout() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error('Erro no logout:', error)
      throw error
    }
  },

  async getSession() {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      return session
    } catch (error) {
      console.error('Erro ao obter sessão:', error)
      return null
    }
  }
}