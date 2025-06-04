export class CrudManager {
  constructor() {
    this.supabase = supabase
  }

  async create(table, data) {
    const { data: result, error } = await this.supabase
      .from(table)
      .insert([data])
      .select()
    
    if (error) throw error
    return result[0]
  }

  async read(table, filters = {}) {
    let query = this.supabase.from(table).select('*')
    
    for (const [key, value] of Object.entries(filters)) {
      query = query.eq(key, value)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data
  }

  async update(table, id, updates) {
    const { data, error } = await this.supabase
      .from(table)
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  }

  async delete(table, id) {
    const { error } = await this.supabase
      .from(table)
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  }
}