import { supabase } from './supabase.client'

export const CrudService = {
  async create(table, data) {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single()
    
    if (error) throw new Error(`Erro ao criar: ${error.message}`)
    return result
  },

  async read(table, filters = {}) {
    let query = supabase.from(table).select('*')
    
    for (const [key, value] of Object.entries(filters)) {
      query = query.eq(key, value)
    }
    
    const { data, error } = await query
    if (error) throw new Error(`Erro ao ler: ${error.message}`)
    return data
  },

  async update(table, id, updates) {
    const { data, error } = await supabase
      .from(table)
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw new Error(`Erro ao atualizar: ${error.message}`)
    return data
  },

  async delete(table, id) {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id)
    
    if (error) throw new Error(`Erro ao deletar: ${error.message}`)
    return true
  }
}