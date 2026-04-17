import { supabase } from '../lib/supabase'

export async function getBooks() {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('책 목록 불러오기 실패:', error.message)
    return []
  }
  return data
}

export async function addBook({ title, author, category, is_millie }) {
  const { error } = await supabase
    .from('books')
    .insert([{ title, author, category, is_millie }])

  if (error) {
    throw new Error(error.message)
  }
}

export async function updateBook(id, { title, author, category, is_millie }) {
  const { error } = await supabase
    .from('books')
    .update({ title, author, category, is_millie })
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }
}

export async function deleteBook(id) {
  const { error } = await supabase.from('books').delete().eq('id', id)
  if (error) {
    console.error('책 삭제 실패:', error.message)
  }
}
